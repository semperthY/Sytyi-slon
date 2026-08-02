<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/functions.php';

$categories = getMenuCategories();

$category = $_POST['category'] ?? '';

if (!isset($categories[$category])) {
    die('Неверная категория.');
}

$file = MENU_PATH . '/' . $category . '.json';

$items = readJson($file);

$image = uploadImage($_FILES['image'] ?? [], 'menu');

$item = [

    'id' => generateSku($category, $items),

    'name' => trim($_POST['name'] ?? ''),

    'description' => trim($_POST['description'] ?? ''),

    'value' => trim($_POST['value'] ?? ''),

    'price' => (int)($_POST['price'] ?? 0),

    'image' => $image,

    'visible' => isset($_POST['visible']),

    'available' => isset($_POST['available']),

    'popular' => isset($_POST['popular']),

    'deleted' => false,

    'sort' => count($items) + 1,

    'createdAt' => now(),

    'updatedAt' => now()

];

$items[] = $item;

if (!writeJson($file, $items)) {
    die('Не удалось сохранить меню.');
}

redirect('menu.php?category=' . urlencode($category));