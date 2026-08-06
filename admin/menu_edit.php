<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/functions.php';

$categories = getMenuCategories();

$category = (string)($_GET['category'] ?? '');
$id = (string)($_GET['id'] ?? '');

if (!isset($categories[$category])) {
    die('Неверная категория.');
}

$file = MENU_PATH . '/' . $category . '.json';
$items = readJson($file);

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
    die('Блюдо не найдено.');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $items[$index]['name'] = trim((string)($_POST['name'] ?? ''));
    $items[$index]['description'] = trim((string)($_POST['description'] ?? ''));
    $items[$index]['value'] = trim((string)($_POST['value'] ?? ''));
    $items[$index]['price'] = (int)($_POST['price'] ?? 0);

    $items[$index]['visible'] = isset($_POST['visible']);
    $items[$index]['available'] = isset($_POST['available']);
    $items[$index]['popular'] = isset($_POST['popular']);

    $items[$index]['updatedAt'] = now();

    if (
        isset($_FILES['image']) &&
        ($_FILES['image']['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_OK
    ) {
        $newImage = uploadImage($_FILES['image'], 'menu');

        if ($newImage !== '') {
            $oldImage = (string)($items[$index]['image'] ?? '');

            if (
                $oldImage !== '' &&
                str_starts_with($oldImage, '/uploads/menu/')
            ) {
                deleteImage($oldImage);
            }

            $items[$index]['image'] = $newImage;
        }
    }

    if (isset($_POST['remove_image'])) {
        $oldImage = (string)($items[$index]['image'] ?? '');

        if (
            $oldImage !== '' &&
            str_starts_with($oldImage, '/uploads/menu/')
        ) {
            deleteImage($oldImage);
        }

        $items[$index]['image'] = '';
    }

    if (!writeJson($file, $items)) {
        die('Не удалось сохранить изменения.');
    }

    redirect(
        'menu.php?category=' .
        urlencode($category)
    );
}

$visible = (bool)($item['visible'] ?? true);
$available = (bool)($item['available'] ?? true);
$popular = (bool)($item['popular'] ?? false);
$image = (string)($item['image'] ?? '');

?>

<!doctype html>

<html lang="ru">

<head>

<meta charset="utf-8">

<meta
name="viewport"
content="width=device-width,initial-scale=1"
>

<title>Редактировать блюдо</title>

<link
rel="stylesheet"
href="assets/css/admin.css"
>

<style>

.visibility-control {
    margin-bottom: 22px;
    padding: 18px;
    border: 1px solid #374151;
    border-radius: 14px;
    background: #1f2937;
}

.visibility-control-title {
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: 700;
}

.visibility-switch {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
    padding: 14px;
    border-radius: 10px;
    background: #111827;
    cursor: pointer;
}

.visibility-switch input {
    width: 22px;
    height: 22px;
    margin: 0;
    accent-color: #f97316;
}

.visibility-switch-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.visibility-switch-label {
    font-weight: 700;
}

.visibility-switch-description {
    color: #9ca3af;
    font-size: 14px;
}

.current-image {
    max-width: 420px;
    overflow: hidden;
    border-radius: 14px;
}

.current-image img {
    display: block;
    width: 100%;
    height: auto;
}

.remove-image {
    margin-top: 12px;
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

<a class="active" href="menu.php">Меню</a>

<a href="gallery.php">Галерея</a>

<a href="settings.php">Настройки</a>

<a href="logout.php">Выход</a>

</aside>

<main class="content">

<div class="page-top">

<h1>Редактировать блюдо</h1>

<a
class="btn btn-blue"
href="menu.php?category=<?= urlencode($category) ?>"
>
← Назад
</a>

</div>

<div class="form">

<form
method="post"
enctype="multipart/form-data"
>

<div class="form-group">

<label>SKU</label>

<input
type="text"
value="<?= htmlspecialchars((string)($item['id'] ?? ''), ENT_QUOTES, 'UTF-8') ?>"
disabled
>

</div>

<div class="form-group">

<label for="name">Название *</label>

<input
id="name"
type="text"
name="name"
value="<?= htmlspecialchars((string)($item['name'] ?? ''), ENT_QUOTES, 'UTF-8') ?>"
required
>

</div>

<div class="form-group">

<label for="description">Описание</label>

<textarea
id="description"
name="description"
><?= htmlspecialchars((string)($item['description'] ?? ''), ENT_QUOTES, 'UTF-8') ?></textarea>

</div>

<div class="form-group">

<label for="value">Размер / вес / количество</label>

<input
id="value"
type="text"
name="value"
value="<?= htmlspecialchars((string)($item['value'] ?? ''), ENT_QUOTES, 'UTF-8') ?>"
>

</div>

<div class="form-group">

<label for="price">Цена *</label>

<input
id="price"
type="number"
name="price"
min="0"
value="<?= htmlspecialchars((string)($item['price'] ?? 0), ENT_QUOTES, 'UTF-8') ?>"
required
>

</div>

<div class="visibility-control">

<div class="visibility-control-title">
Отображение блюда
</div>

<label class="visibility-switch" for="visible">

<input
id="visible"
type="checkbox"
name="visible"
<?= $visible ? 'checked' : '' ?>
>

<span class="visibility-switch-text">

<span class="visibility-switch-label">
Показывать блюдо на сайте
</span>

<span class="visibility-switch-description">
Снимите галочку, чтобы скрыть блюдо из меню
</span>

</span>

</label>

</div>

<div class="checkbox">

<input
id="available"
type="checkbox"
name="available"
<?= $available ? 'checked' : '' ?>
>

<label for="available">
В наличии
</label>

</div>

<div class="checkbox">

<input
id="popular"
type="checkbox"
name="popular"
<?= $popular ? 'checked' : '' ?>
>

<label for="popular">
Хит продаж
</label>

</div>

<?php if ($image !== ''): ?>

<div class="form-group">

<label>Текущее фото</label>

<div class="current-image">

<img
src="<?= htmlspecialchars($image, ENT_QUOTES, 'UTF-8') ?>"
alt="<?= htmlspecialchars((string)($item['name'] ?? ''), ENT_QUOTES, 'UTF-8') ?>"
>

</div>

<label class="checkbox remove-image">

<input
type="checkbox"
name="remove_image"
value="1"
>

Удалить текущее фото

</label>

</div>

<?php endif; ?>

<div class="form-group">

<label for="image">Новое фото</label>

<input
id="image"
type="file"
name="image"
accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
>

</div>

<div class="form-actions">

<button
class="btn btn-primary"
type="submit"
>
Сохранить изменения
</button>

<a
class="btn btn-blue"
href="menu.php?category=<?= urlencode($category) ?>"
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