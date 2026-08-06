<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';

if (empty($_SESSION['gallery_csrf'])) {
    $_SESSION['gallery_csrf'] = bin2hex(random_bytes(32));
}

$csrf = (string)$_SESSION['gallery_csrf'];
$id = trim((string)($_GET['id'] ?? ''));

$items = readJson(GALLERY_FILE);

$index = null;
$item = null;

foreach ($items as $key => $row) {
    if (($row['id'] ?? '') === $id) {
        $index = $key;
        $item = $row;
        break;
    }
}

if ($item === null || $index === null) {
    die('Фотография не найдена.');
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postedCsrf = (string)($_POST['csrf'] ?? '');

    if (!hash_equals($csrf, $postedCsrf)) {
        http_response_code(403);
        exit('Недействительный CSRF-токен.');
    }

    $alt = trim((string)($_POST['alt'] ?? ''));

    $items[$index]['alt'] = $alt !== ''
        ? $alt
        : 'Фото кафе «Сытый слонъ»';

    $items[$index]['visible'] = isset($_POST['visible']);
    $items[$index]['updatedAt'] = now();

    if (
        isset($_FILES['image']) &&
        ($_FILES['image']['error'] ?? UPLOAD_ERR_NO_FILE) ===
        UPLOAD_ERR_OK
    ) {
        $newImage = uploadImage($_FILES['image'], 'gallery');

        if ($newImage === '') {
            $error =
                'Не удалось загрузить фотографию. Разрешены JPG, JPEG, PNG и WEBP.';
        } else {
            $oldImage = (string)($items[$index]['src'] ?? '');

            if (
                $oldImage !== '' &&
                str_starts_with($oldImage, '/uploads/gallery/')
            ) {
                deleteImage($oldImage);
            }

            $items[$index]['src'] = $newImage;
        }
    }

    if ($error === '') {
        if (!writeJson(GALLERY_FILE, $items)) {
            $error = 'Не удалось сохранить gallery.json.';
        } else {
            redirect('gallery.php?status=edited');
        }
    }

    $item = $items[$index];
}

$src = (string)($item['src'] ?? '');
$alt = (string)($item['alt'] ?? '');
$visible = (bool)($item['visible'] ?? true);

?>

<!doctype html>

<html lang="ru">

<head>

<meta charset="utf-8">

<meta
name="viewport"
content="width=device-width,initial-scale=1"
>

<title>Редактировать фотографию</title>

<link
rel="stylesheet"
href="assets/css/admin.css"
>

<style>

.gallery-edit-preview {
    max-width: 700px;
    margin-bottom: 22px;
    overflow: hidden;
    border-radius: 16px;
    background: #1f2937;
}

.gallery-edit-preview img {
    display: block;
    width: 100%;
    max-height: 500px;
    object-fit: contain;
    background: #111827;
}

.gallery-edit-error {
    max-width: 700px;
    margin-bottom: 20px;
    padding: 14px 16px;
    border: 1px solid #dc2626;
    border-radius: 10px;
    background: #7f1d1d;
}

.visibility-control {
    margin-bottom: 20px;
    padding: 16px;
    border-radius: 12px;
    background: #1f2937;
}

.visibility-control label {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
    cursor: pointer;
}

.visibility-control input {
    width: 22px;
    height: 22px;
    margin: 0;
    accent-color: #f97316;
}

.form-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

@media (max-width: 768px) {
    .form-actions {
        flex-direction: column;
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

<h1>Редактировать фотографию</h1>

<a
class="btn btn-blue"
href="gallery.php"
>
← Назад
</a>

</div>

<?php if ($error !== ''): ?>

<div class="gallery-edit-error">

<?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?>

</div>

<?php endif; ?>

<?php if ($src !== ''): ?>

<div class="gallery-edit-preview">

<img
src="<?= htmlspecialchars($src, ENT_QUOTES, 'UTF-8') ?>"
alt="<?= htmlspecialchars($alt, ENT_QUOTES, 'UTF-8') ?>"
>

</div>

<?php endif; ?>

<div class="form">

<form
method="post"
enctype="multipart/form-data"
>

<input
type="hidden"
name="csrf"
value="<?= htmlspecialchars($csrf, ENT_QUOTES, 'UTF-8') ?>"
>

<div class="form-group">

<label for="alt">Описание фотографии</label>

<textarea
id="alt"
name="alt"
maxlength="180"
placeholder="Например: Интерьер кафе"
><?= htmlspecialchars($alt, ENT_QUOTES, 'UTF-8') ?></textarea>

</div>

<div class="form-group">

<label for="image">Заменить фотографию</label>

<input
id="image"
type="file"
name="image"
accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
>

</div>

<div class="visibility-control">

<label for="visible">

<input
id="visible"
type="checkbox"
name="visible"
<?= $visible ? 'checked' : '' ?>
>

<span>Показывать фотографию на сайте</span>

</label>

</div>

<div class="form-actions">

<button
type="submit"
class="btn btn-primary"
>
Сохранить изменения
</button>

<a
class="btn btn-blue"
href="gallery.php"
>
Отмена
</a>

</div>

</form>

</div>

</main>

</div>

</body>

</html>