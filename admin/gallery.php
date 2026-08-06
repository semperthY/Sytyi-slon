<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';

if (empty($_SESSION['gallery_csrf'])) {
    $_SESSION['gallery_csrf'] = bin2hex(random_bytes(32));
}

$csrf = (string)$_SESSION['gallery_csrf'];

function galleryRedirect(string $status): never
{
    redirect('gallery.php?status=' . urlencode($status));
}

function normalizeGalleryFiles(array $files): array
{
    if (
        !isset(
            $files['name'],
            $files['type'],
            $files['tmp_name'],
            $files['error'],
            $files['size']
        )
    ) {
        return [];
    }

    if (!is_array($files['name'])) {
        return [$files];
    }

    $normalized = [];

    foreach ($files['name'] as $index => $name) {
        $normalized[] = [
            'name' => $name,
            'type' => $files['type'][$index] ?? '',
            'tmp_name' => $files['tmp_name'][$index] ?? '',
            'error' => $files['error'][$index] ?? UPLOAD_ERR_NO_FILE,
            'size' => $files['size'][$index] ?? 0,
        ];
    }

    return $normalized;
}

function normalizeGallerySort(array &$items): void
{
    usort(
        $items,
        static fn(array $first, array $second): int =>
            ((int)($first['sort'] ?? 0)) <=>
            ((int)($second['sort'] ?? 0))
    );

    foreach ($items as $index => &$item) {
        $item['sort'] = ($index + 1) * 10;
    }

    unset($item);
}

function findGalleryIndex(array $items, string $id): int
{
    foreach ($items as $index => $item) {
        if (($item['id'] ?? '') === $id) {
            return $index;
        }
    }

    return -1;
}

function generateGalleryId(array $items): string
{
    $max = 0;

    foreach ($items as $item) {
        $id = (string)($item['id'] ?? '');

        if (preg_match('/^GAL(\d+)$/', $id, $matches) !== 1) {
            continue;
        }

        $number = (int)$matches[1];

        if ($number > $max) {
            $max = $number;
        }
    }

    return sprintf('GAL%03d', $max + 1);
}

$items = readJson(GALLERY_FILE);

normalizeGallerySort($items);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postedCsrf = (string)($_POST['csrf'] ?? '');

    if (!hash_equals($csrf, $postedCsrf)) {
        http_response_code(403);
        exit('Недействительный CSRF-токен.');
    }

    $action = (string)($_POST['action'] ?? '');

    if ($action === 'upload') {
        $alt = trim((string)($_POST['alt'] ?? ''));
        $uploadedFiles = normalizeGalleryFiles($_FILES['images'] ?? []);
        $uploadedCount = 0;

        foreach ($uploadedFiles as $file) {
            if (
                ($file['error'] ?? UPLOAD_ERR_NO_FILE) ===
                UPLOAD_ERR_NO_FILE
            ) {
                continue;
            }

            $path = uploadImage($file, 'gallery');

            if ($path === '') {
                continue;
            }

            $items[] = [
                'id' => generateGalleryId($items),
                'src' => $path,
                'alt' => $alt !== ''
                    ? $alt
                    : 'Фото кафе «Сытый слонъ»',
                'visible' => true,
                'sort' => (count($items) + 1) * 10,
                'createdAt' => now(),
                'updatedAt' => now(),
            ];

            $uploadedCount++;
        }

        normalizeGallerySort($items);

        if ($uploadedCount === 0) {
            galleryRedirect('upload-error');
        }

        if (!writeJson(GALLERY_FILE, $items)) {
            galleryRedirect('save-error');
        }

        galleryRedirect('uploaded');
    }

    $id = trim((string)($_POST['id'] ?? ''));
    $index = findGalleryIndex($items, $id);

    if ($index < 0) {
        galleryRedirect('not-found');
    }

    if ($action === 'toggle') {
        $items[$index]['visible'] =
            !((bool)($items[$index]['visible'] ?? true));

        $items[$index]['updatedAt'] = now();

        if (!writeJson(GALLERY_FILE, $items)) {
            galleryRedirect('save-error');
        }

        galleryRedirect('updated');
    }

    if ($action === 'move-up' && $index > 0) {
        [$items[$index - 1], $items[$index]] = [
            $items[$index],
            $items[$index - 1],
        ];

        normalizeGallerySort($items);

        $items[$index - 1]['updatedAt'] = now();

        if (!writeJson(GALLERY_FILE, $items)) {
            galleryRedirect('save-error');
        }

        galleryRedirect('moved');
    }

    if (
        $action === 'move-down' &&
        $index < count($items) - 1
    ) {
        [$items[$index], $items[$index + 1]] = [
            $items[$index + 1],
            $items[$index],
        ];

        normalizeGallerySort($items);

        $items[$index + 1]['updatedAt'] = now();

        if (!writeJson(GALLERY_FILE, $items)) {
            galleryRedirect('save-error');
        }

        galleryRedirect('moved');
    }

    if ($action === 'delete') {
        $imagePath = (string)($items[$index]['src'] ?? '');

        if (str_starts_with($imagePath, '/uploads/gallery/')) {
            deleteImage($imagePath);
        }

        array_splice($items, $index, 1);

        normalizeGallerySort($items);

        if (!writeJson(GALLERY_FILE, $items)) {
            galleryRedirect('save-error');
        }

        galleryRedirect('deleted');
    }
}

$status = (string)($_GET['status'] ?? '');

$statusMessages = [
    'uploaded' => 'Фотографии добавлены.',
    'updated' => 'Фотография обновлена.',
    'moved' => 'Порядок фотографий изменён.',
    'deleted' => 'Фотография удалена.',
    'edited' => 'Изменения сохранены.',
];

$errorMessages = [
    'upload-error' =>
        'Не удалось загрузить фотографии. Разрешены JPG, JPEG, PNG и WEBP.',
    'save-error' => 'Не удалось сохранить gallery.json.',
    'not-found' => 'Фотография не найдена.',
];

$message = $statusMessages[$status] ?? '';
$error = $errorMessages[$status] ?? '';

?>

<!doctype html>

<html lang="ru">

<head>

<meta charset="utf-8">

<meta
name="viewport"
content="width=device-width,initial-scale=1"
>

<title>Галерея</title>

<link
rel="stylesheet"
href="assets/css/admin.css"
>

<style>

.gallery-upload {
    margin-bottom: 25px;
    padding: 22px;
    border-radius: 16px;
    background: #1f2937;
}

.gallery-upload h2 {
    margin: 0 0 18px;
}

.gallery-upload-grid {
    display: grid;
    grid-template-columns:
        minmax(220px, 1fr)
        minmax(220px, 1fr)
        auto;
    gap: 15px;
    align-items: end;
}

.gallery-upload label {
    display: block;
    margin-bottom: 7px;
    font-weight: 700;
}

.gallery-upload input {
    width: 100%;
    min-height: 46px;
    padding: 11px 13px;
    border: 0;
    border-radius: 10px;
    background: #ffffff;
    color: #111827;
}

.gallery-upload .btn {
    min-height: 46px;
}

.gallery-message {
    margin-bottom: 20px;
    padding: 14px 16px;
    border-radius: 10px;
}

.gallery-message-success {
    border: 1px solid #16a34a;
    background: #14532d;
}

.gallery-message-error {
    border: 1px solid #dc2626;
    background: #7f1d1d;
}

.gallery-count {
    margin-bottom: 20px;
    color: #9ca3af;
}

.gallery-grid {
    display: grid;
    grid-template-columns:
        repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
}

.gallery-card {
    overflow: hidden;
    border: 1px solid #374151;
    border-radius: 16px;
    background: #1f2937;
}

.gallery-card-hidden {
    opacity: .55;
}

.gallery-image {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: #111827;
}

.gallery-image img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.gallery-position {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 6px 9px;
    border-radius: 8px;
    background: rgba(0, 0, 0, .7);
    font-size: 13px;
}

.gallery-state {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 6px 9px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
}

.gallery-state-visible {
    background: #15803d;
}

.gallery-state-hidden {
    background: #6b7280;
}

.gallery-body {
    padding: 16px;
}

.gallery-alt {
    min-height: 42px;
    margin-bottom: 15px;
    line-height: 1.4;
}

.gallery-actions {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
}

.gallery-actions form {
    margin: 0;
}

.gallery-action {
    display: flex;
    width: 100%;
    height: 42px;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 0;
    border-radius: 9px;
    cursor: pointer;
    color: #ffffff;
    text-decoration: none;
    font-size: 20px;
}

.gallery-action svg {
    width: 20px;
    height: 20px;
}

.gallery-action:disabled {
    cursor: not-allowed;
    opacity: .35;
}

.gallery-action-move {
    background: #2563eb;
}

.gallery-action-edit {
    background: #7c3aed;
}

.gallery-action-toggle {
    background: #ca8a04;
}

.gallery-action-delete {
    background: #dc2626;
}

.gallery-empty {
    padding: 35px;
    border-radius: 16px;
    background: #1f2937;
    text-align: center;
    color: #9ca3af;
}

@media (max-width: 768px) {
    .gallery-upload-grid {
        grid-template-columns: 1fr;
    }

    .gallery-grid {
        grid-template-columns: 1fr;
    }
}

</style>

</head>

<body>

<div class="admin-layout">

<aside class="sidebar">

<h2>Сытый слонъ</h2>

<a href="dashboard.php">Главная</a>

<a href="menu.php">Меню</a>

<a class="active" href="gallery.php">Галерея</a>

<a href="settings.php">Настройки</a>

<a href="logout.php">Выход</a>

</aside>

<main class="content">

<div class="page-top">

<h1>Галерея</h1>

<a
class="btn btn-blue"
href="/gallery/"
target="_blank"
rel="noopener noreferrer"
>
Открыть на сайте
</a>

</div>

<?php if ($message !== ''): ?>

<div class="gallery-message gallery-message-success">

<?= htmlspecialchars($message, ENT_QUOTES, 'UTF-8') ?>

</div>

<?php endif; ?>

<?php if ($error !== ''): ?>

<div class="gallery-message gallery-message-error">

<?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?>

</div>

<?php endif; ?>

<section class="gallery-upload">

<h2>Добавить фотографии</h2>

<form
method="post"
enctype="multipart/form-data"
class="gallery-upload-grid"
>

<input
type="hidden"
name="csrf"
value="<?= htmlspecialchars($csrf, ENT_QUOTES, 'UTF-8') ?>"
>

<input
type="hidden"
name="action"
value="upload"
>

<div>

<label for="images">Файлы</label>

<input
id="images"
type="file"
name="images[]"
accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
multiple
required
>

</div>

<div>

<label for="alt">Описание фотографий</label>

<input
id="alt"
type="text"
name="alt"
maxlength="180"
placeholder="Например: Интерьер кафе"
>

</div>

<button
type="submit"
class="btn btn-primary"
>
Загрузить
</button>

</form>

</section>

<div class="gallery-count">
Всего фотографий: <?= count($items) ?>
</div>

<?php if ($items === []): ?>

<div class="gallery-empty">
В галерее пока нет фотографий.
</div>

<?php else: ?>

<div class="gallery-grid">

<?php foreach ($items as $index => $item): ?>

<?php

$id = (string)($item['id'] ?? '');
$src = (string)($item['src'] ?? '');
$alt = (string)($item['alt'] ?? 'Фото галереи');
$visible = (bool)($item['visible'] ?? true);

?>

<article class="gallery-card <?= $visible ? '' : 'gallery-card-hidden' ?>">

<div class="gallery-image">

<img
src="<?= htmlspecialchars($src, ENT_QUOTES, 'UTF-8') ?>"
alt="<?= htmlspecialchars($alt, ENT_QUOTES, 'UTF-8') ?>"
loading="lazy"
>

<div class="gallery-position">
<?= $index + 1 ?>
</div>

<div class="gallery-state <?= $visible ? 'gallery-state-visible' : 'gallery-state-hidden' ?>">
<?= $visible ? 'На сайте' : 'Скрыто' ?>
</div>

</div>

<div class="gallery-body">

<div class="gallery-alt">
<?= htmlspecialchars($alt, ENT_QUOTES, 'UTF-8') ?>
</div>

<div class="gallery-actions">

<form method="post">

<input
type="hidden"
name="csrf"
value="<?= htmlspecialchars($csrf, ENT_QUOTES, 'UTF-8') ?>"
>

<input
type="hidden"
name="action"
value="move-up"
>

<input
type="hidden"
name="id"
value="<?= htmlspecialchars($id, ENT_QUOTES, 'UTF-8') ?>"
>

<button
type="submit"
class="gallery-action gallery-action-move"
title="Переместить выше"
aria-label="Переместить выше"
<?= $index === 0 ? 'disabled' : '' ?>
>
↑
</button>

</form>

<form method="post">

<input
type="hidden"
name="csrf"
value="<?= htmlspecialchars($csrf, ENT_QUOTES, 'UTF-8') ?>"
>

<input
type="hidden"
name="action"
value="move-down"
>

<input
type="hidden"
name="id"
value="<?= htmlspecialchars($id, ENT_QUOTES, 'UTF-8') ?>"
>

<button
type="submit"
class="gallery-action gallery-action-move"
title="Переместить ниже"
aria-label="Переместить ниже"
<?= $index === count($items) - 1 ? 'disabled' : '' ?>
>
↓
</button>

</form>

<a
class="gallery-action gallery-action-edit"
href="gallery_edit.php?id=<?= urlencode($id) ?>"
title="Редактировать фотографию"
aria-label="Редактировать фотографию"
>
<svg
viewBox="0 0 24 24"
fill="none"
aria-hidden="true"
>
<path
d="M4 20h4L19 9l-4-4L4 16v4Z"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
/>
<path
d="m13.5 6.5 4 4"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
/>
</svg>
</a>

<form method="post">

<input
type="hidden"
name="csrf"
value="<?= htmlspecialchars($csrf, ENT_QUOTES, 'UTF-8') ?>"
>

<input
type="hidden"
name="action"
value="toggle"
>

<input
type="hidden"
name="id"
value="<?= htmlspecialchars($id, ENT_QUOTES, 'UTF-8') ?>"
>

<button
type="submit"
class="gallery-action gallery-action-toggle"
title="<?= $visible ? 'Скрыть на сайте' : 'Показать на сайте' ?>"
aria-label="<?= $visible ? 'Скрыть на сайте' : 'Показать на сайте' ?>"
>
<?= $visible ? '◉' : '○' ?>
</button>

</form>

<form
method="post"
onsubmit="return confirm('Удалить фотографию?');"
>

<input
type="hidden"
name="csrf"
value="<?= htmlspecialchars($csrf, ENT_QUOTES, 'UTF-8') ?>"
>

<input
type="hidden"
name="action"
value="delete"
>

<input
type="hidden"
name="id"
value="<?= htmlspecialchars($id, ENT_QUOTES, 'UTF-8') ?>"
>

<button
type="submit"
class="gallery-action gallery-action-delete"
title="Удалить"
aria-label="Удалить"
>
×
</button>

</form>

</div>

</div>

</article>

<?php endforeach; ?>

</div>

<?php endif; ?>

</main>

</div>

</body>

</html>