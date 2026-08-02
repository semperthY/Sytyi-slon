<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/functions.php';


$categories = getMenuCategories();


$category = $_GET['category'] ?? '';

$id = $_GET['id'] ?? '';



if (!isset($categories[$category])) {

    die('Неверная категория.');

}



$file = MENU_PATH . '/' . $category . '.json';



$items = readJson($file);



foreach ($items as &$item) {


    if (($item['id'] ?? '') !== $id) {

        continue;

    }


    $item['deleted'] = true;


    $item['updatedAt'] = now();


    break;

}


unset($item);



writeJson(
    $file,
    $items
);



redirect(
    'menu.php?category=' . urlencode($category)
);