<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/functions.php';

$categories = getMenuCategories();

$current = (string)($_GET['category'] ?? 'salads');

if (!isset($categories[$current])) {
    $current = 'salads';
}

$file = MENU_PATH . '/' . $current . '.json';
$items = readJson($file);

$activeItems = array_values(
    array_filter(
        $items,
        static fn(array $item): bool => empty($item['deleted'])
    )
);

?>

<!doctype html>

<html lang="ru">

<head>

<meta charset="utf-8">

<meta
name="viewport"
content="width=device-width,initial-scale=1"
>

<title>
<?= htmlspecialchars($categories[$current], ENT_QUOTES, 'UTF-8') ?>
</title>

<link
rel="stylesheet"
href="assets/css/admin.css"
>

<style>

.card-hidden {
    opacity: .65;
    border: 1px solid #6b7280;
}

.card-actions form {
    margin: 0;
}

.icon-btn {
    border: 0;
    cursor: pointer;
}

.icon-visible {
    background: #ca8a04;
}

.icon-hidden {
    background: #16a34a;
}

.icon-visible svg,
.icon-hidden svg {
    fill: none;
    stroke: #ffffff;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.empty {
    padding: 30px;
    border-radius: 14px;
    background: #1f2937;
    color: #9ca3af;
    text-align: center;
}

.menu-categories a:focus {
    outline: none;
}

</style>

</head>

<body>

<div class="admin-layout">

<aside class="sidebar">

<h2>Сытый слонъ</h2>

<a href="dashboard.php">
Главная
</a>

<a class="active" href="menu.php">
Меню
</a>

<a href="gallery.php">
Галерея
</a>

<a href="settings.php">
Настройки
</a>

<a href="logout.php">
Выход
</a>

</aside>

<main class="content">

<div class="page-top">

<h1>
<?= htmlspecialchars($categories[$current], ENT_QUOTES, 'UTF-8') ?>
</h1>

<a
class="btn btn-primary"
href="menu_add.php?category=<?= urlencode($current) ?>"
>
+ Добавить блюдо
</a>

</div>

<div class="menu-categories">

<?php foreach ($categories as $key => $title): ?>

<a
class="category-link <?= $current === $key ? 'active' : '' ?>"
href="?category=<?= urlencode($key) ?>"
data-category="<?= htmlspecialchars($key, ENT_QUOTES, 'UTF-8') ?>"
>
<?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>
</a>

<?php endforeach; ?>

</div>

<?php if ($activeItems === []): ?>

<div class="empty">
В этой категории пока нет блюд.
</div>

<?php else: ?>

<div class="cards">

<?php foreach ($activeItems as $item): ?>

<?php

$id = (string)($item['id'] ?? '');
$name = (string)($item['name'] ?? 'Без названия');
$image = (string)($item['image'] ?? '');
$description = (string)($item['description'] ?? '');
$value = (string)($item['value'] ?? '');
$price = (int)($item['price'] ?? 0);

$visible = (bool)($item['visible'] ?? true);
$available = (bool)($item['available'] ?? true);
$popular = (bool)($item['popular'] ?? false);

?>

<div class="card <?= $visible ? '' : 'card-hidden' ?>">

<?php if ($image !== ''): ?>

<div class="card-image">

<img
src="<?= htmlspecialchars($image, ENT_QUOTES, 'UTF-8') ?>"
alt="<?= htmlspecialchars($name, ENT_QUOTES, 'UTF-8') ?>"
>

</div>

<?php endif; ?>

<div class="card-body">

<div class="card-sku">
<?= htmlspecialchars($id, ENT_QUOTES, 'UTF-8') ?>
</div>

<div class="card-title">
<?= htmlspecialchars($name, ENT_QUOTES, 'UTF-8') ?>
</div>

<?php if ($description !== ''): ?>

<div class="card-value">
<?= htmlspecialchars($description, ENT_QUOTES, 'UTF-8') ?>
</div>

<?php endif; ?>

<?php if ($value !== ''): ?>

<div class="card-value">
<?= htmlspecialchars($value, ENT_QUOTES, 'UTF-8') ?>
</div>

<?php endif; ?>

<div class="card-price">

<?= number_format(
    $price,
    0,
    '',
    ' '
) ?> ₽

</div>

<div class="badges">

<?php if (!$visible): ?>

<span class="badge badge-hidden">
Скрыто
</span>

<?php endif; ?>

<?php if (!$available): ?>

<span class="badge badge-unavailable">
Нет в наличии
</span>

<?php endif; ?>

<?php if ($popular): ?>

<span class="badge badge-popular">
Хит
</span>

<?php endif; ?>

</div>

<div class="card-actions">

<a
class="icon-btn icon-edit"
href="menu_edit.php?category=<?= urlencode($current) ?>&id=<?= urlencode($id) ?>"
title="Редактировать"
aria-label="Редактировать"
>

<svg viewBox="0 0 24 24">

<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.04c.39-.39.39-1.03 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 2-1.66z"/>

</svg>

</a>

<form
method="post"
action="menu_toggle.php"
>

<input
type="hidden"
name="category"
value="<?= htmlspecialchars($current, ENT_QUOTES, 'UTF-8') ?>"
>

<input
type="hidden"
name="id"
value="<?= htmlspecialchars($id, ENT_QUOTES, 'UTF-8') ?>"
>

<button
type="submit"
class="icon-btn <?= $visible ? 'icon-visible' : 'icon-hidden' ?>"
title="<?= $visible ? 'Скрыть блюдо' : 'Показать блюдо' ?>"
aria-label="<?= $visible ? 'Скрыть блюдо' : 'Показать блюдо' ?>"
>

<?php if ($visible): ?>

<svg viewBox="0 0 24 24">

<path d="M3 3l18 18"/>

<path d="M10.6 10.7a2 2 0 0 0 2.7 2.7"/>

<path d="M9.9 4.2A10.7 10.7 0 0 1 12 4c5.5 0 9 8 9 8a16.7 16.7 0 0 1-2.1 3.2"/>

<path d="M6.6 6.6C4.3 8.1 3 12 3 12s3.5 8 9 8a9.7 9.7 0 0 0 4.3-1"/>

</svg>

<?php else: ?>

<svg viewBox="0 0 24 24">

<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/>

<circle cx="12" cy="12" r="3"/>

</svg>

<?php endif; ?>

</button>

</form>

<a
class="icon-btn icon-delete"
href="menu_delete.php?category=<?= urlencode($current) ?>&id=<?= urlencode($id) ?>"
onclick="return confirm('Удалить блюдо?')"
title="Удалить"
aria-label="Удалить"
>

<svg viewBox="0 0 24 24">

<path d="M6 7h12l-1 14H7L6 7zm3-4h6l1 2h5v2H3V5h5l1-2z"/>

</svg>

</a>

</div>

</div>

</div>

<?php endforeach; ?>

</div>

<?php endif; ?>

</main>

</div>

<script>

document.addEventListener('DOMContentLoaded', function () {
    if (window.innerWidth > 768) {
        return;
    }

    const activeCategory = document.querySelector(
        '.menu-categories .active'
    );

    if (!activeCategory) {
        return;
    }

    window.requestAnimationFrame(function () {
        activeCategory.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'nearest'
        });
    });
});

</script>

</body>

</html>