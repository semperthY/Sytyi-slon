<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/functions.php';


$categories = getMenuCategories();


$current = $_GET['category'] ?? 'salads';


if (!isset($categories[$current])) {

    $current = 'salads';

}


?>


<!doctype html>

<html lang="ru">

<head>

<meta charset="utf-8">

<meta
name="viewport"
content="width=device-width,initial-scale=1">


<title>
Добавить блюдо
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

Добавить блюдо

</h1>


<a
class="btn btn-blue"
href="menu.php?category=<?=urlencode($current)?>">

← Назад

</a>


</div>




<form
class="form"
action="menu_save.php"
method="post"
enctype="multipart/form-data">



<input
type="hidden"
name="category"
value="<?=htmlspecialchars($current)?>">



<div class="form-group">


<label>

Название *

</label>


<input
type="text"
name="name"
required>


</div>




<div class="form-group">


<label>

Описание

</label>


<textarea
name="description"></textarea>


</div>




<div class="form-group">


<label>

Размер / вес / количество

</label>


<input
type="text"
name="value"
placeholder="250 г / 8 шт. / 0.5 л">


</div>




<div class="form-group">


<label>

Цена *

</label>


<input
type="number"
name="price"
min="0"
required>


</div>




<div class="form-group">


<label>

Фото блюда

</label>


<input
type="file"
name="image"
accept="image/*">


</div>



<div class="checkbox">


<input
id="visible"
type="checkbox"
name="visible"
checked>


<label for="visible">

Показывать на сайте

</label>


</div>

<div class="checkbox">


<input
id="available"
type="checkbox"
name="available"
checked>


<label for="available">

В наличии

</label>


</div>




<div class="checkbox">


<input
id="popular"
type="checkbox"
name="popular">


<label for="popular">

Хит продаж

</label>


</div>




<button
class="btn btn-primary"
type="submit">

💾 Сохранить блюдо

</button>



</form>


</main>


</div>


</body>


</html>