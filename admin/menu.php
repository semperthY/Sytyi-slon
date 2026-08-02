<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/functions.php';


$categories = getMenuCategories();


$current = $_GET['category'] ?? 'salads';


if (!isset($categories[$current])) {

    $current = 'salads';

}


$file = MENU_PATH . '/' . $current . '.json';


$items = readJson($file);


?>


<!doctype html>

<html lang="ru">

<head>

<meta charset="utf-8">

<meta
name="viewport"
content="width=device-width,initial-scale=1">


<title>

<?=htmlspecialchars($categories[$current])?>

</title>


<link
rel="stylesheet"
href="assets/css/admin.css">


</head>



<body>



<div class="admin-layout">



<aside class="sidebar">


<h2>
Сытый слонъ
</h2>



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

<?=htmlspecialchars($categories[$current])?>

</h1>



<a
class="btn btn-primary"
href="menu_add.php?category=<?=urlencode($current)?>">

+ Добавить блюдо

</a>


</div>




<div class="menu-categories">


<?php foreach ($categories as $key => $title): ?>


<a
class="<?=$current === $key ? 'active' : ''?>"
href="?category=<?=urlencode($key)?>">

<?=htmlspecialchars($title)?>

</a>


<?php endforeach; ?>


</div>




<div class="cards">



<?php foreach ($items as $item): ?>


<?php if (!empty($item['deleted'])) continue; ?>



<div class="card">



<?php if (!empty($item['image'])): ?>


<div class="card-image">


<img

src="<?=htmlspecialchars($item['image'])?>"

alt="<?=htmlspecialchars($item['name'] ?? '')?>"

>


</div>


<?php endif; ?>



<div class="card-body">
    <div class="card-sku">

<?=htmlspecialchars($item['id'] ?? '')?>

</div>




<div class="card-title">

<?=htmlspecialchars($item['name'] ?? 'Без названия')?>

</div>




<?php if (!empty($item['description'])): ?>


<div class="card-value">

<?=htmlspecialchars($item['description'])?>

</div>


<?php endif; ?>




<div class="card-value">

<?=htmlspecialchars($item['value'] ?? '')?>

</div>




<div class="card-price">

<?=number_format(
    (int)($item['price'] ?? 0),
    0,
    '',
    ' '
)?> ₽

</div>




<div class="badges">



<?php if (!($item['visible'] ?? true)): ?>


<span class="badge badge-hidden">

Скрыто

</span>


<?php endif; ?>




<?php if (!($item['available'] ?? true)): ?>


<span class="badge badge-unavailable">

Нет в наличии

</span>


<?php endif; ?>




<?php if ($item['popular'] ?? false): ?>


<span class="badge badge-popular">

Хит

</span>


<?php endif; ?>



</div>




<div class="card-actions">



<a
class="icon-btn icon-edit"
href="menu_edit.php?category=<?=urlencode($current)?>&id=<?=urlencode($item['id'])?>"
title="Редактировать">


<svg viewBox="0 0 24 24">

<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.04c.39-.39.39-1.03 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 2-1.66z"/>

</svg>


</a>




<a
class="icon-btn icon-delete"
href="menu_delete.php?category=<?=urlencode($current)?>&id=<?=urlencode($item['id'])?>"
onclick="return confirm('Удалить блюдо?')"
title="Удалить">


<svg viewBox="0 0 24 24">

<path d="M6 7h12l-1 14H7L6 7zm3-4h6l1 2h5v2H3V5h5l1-2z"/>

</svg>


</a>



</div>



</div>



</div>



<?php endforeach; ?>



</div>




<?php if (empty($items)): ?>


<div class="empty">

В этой категории пока нет блюд.

</div>


<?php endif; ?>



</main>



</div>



</body>


</html>