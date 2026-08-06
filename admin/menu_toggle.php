<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/functions.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect('menu.php');
}

$categories = getMenuCategories();

$category = trim((string)($_POST['category'] ?? ''));
$id = trim((string)($_POST['id'] ?? ''));

if (!isset($categories[$category])) {
    die('Неверная категория.');
}

if ($id === '') {
    die('Не указано блюдо.');
}

$file = MENU_PATH . '/' . $category . '.json';
$items = readJson($file);

$found = false;

foreach ($items as &$item) {
    if (($item['id'] ?? '') !== $id) {
        continue;
    }

    $item['visible'] = !((bool)($item['visible'] ?? true));
    $item['updatedAt'] = now();

    $found = true;
    break;
}

unset($item);

if (!$found) {
    die('Блюдо не найдено.');
}

if (!writeJson($file, $items)) {
    die('Не удалось сохранить изменения.');
}

redirect(
    'menu.php?category=' .
    urlencode($category)
);