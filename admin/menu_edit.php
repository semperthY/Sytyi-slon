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



$index = null;

$item = null;



foreach ($items as $key => $row) {


    if (($row['id'] ?? '') === $id) {


        $index = $key;

        $item = $row;

        break;

    }

}



if ($item === null) {

    die('Блюдо не найдено.');

}



if ($_SERVER['REQUEST_METHOD'] === 'POST') {



    $items[$index]['name'] =
        trim($_POST['name'] ?? '');



    $items[$index]['description'] =
        trim($_POST['description'] ?? '');



    $items[$index]['value'] =
        trim($_POST['value'] ?? '');



    $items[$index]['price'] =
        (int)($_POST['price'] ?? 0);



    $items[$index]['visible'] =
        isset($_POST['visible']);



    $items[$index]['available'] =
        isset($_POST['available']);



    $items[$index]['popular'] =
        isset($_POST['popular']);



    $items[$index]['updatedAt'] =
        now();




    if (
        isset($_FILES['image']) &&
        $_FILES['image']['error'] === UPLOAD_ERR_OK
    ) {



        $newImage = uploadImage(
            $_FILES['image'],
            'menu'
        );



        if ($newImage !== '') {



            if (!empty($items[$index]['image'])) {


                deleteImage(
                    $items[$index]['image']
                );


            }



            $items[$index]['image'] =
                $newImage;


        }


    }



    writeJson(
        $file,
        $items
    );



    redirect(
        'menu.php?category=' .
        urlencode($category)
    );


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

Редактировать блюдо

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

Редактировать

</h1>


<a
class="btn btn-blue"
href="menu.php?category=<?=urlencode($category)?>">


← Назад


</a>


</div>
<div class="form">


<form
method="post"
enctype="multipart/form-data">



<div class="form-group">


<label>

SKU

</label>


<input
type="text"
value="<?=htmlspecialchars($item['id'])?>"
disabled>


</div>




<div class="form-group">


<label>

Название *

</label>


<input
type="text"
name="name"
value="<?=htmlspecialchars($item['name'] ?? '')?>"
required>


</div>




<div class="form-group">


<label>

Описание

</label>


<textarea
name="description"><?=htmlspecialchars($item['description'] ?? '')?></textarea>


</div>




<div class="form-group">


<label>

Размер / вес / количество

</label>


<input
type="text"
name="value"
value="<?=htmlspecialchars($item['value'] ?? '')?>">


</div>




<div class="form-group">


<label>

Цена *

</label>


<input
type="number"
name="price"
min="0"
value="<?=htmlspecialchars((string)($item['price'] ?? 0))?>"
required>


</div>




<?php if (!empty($item['image'])): ?>


<div class="form-group">


<label>

Текущее фото

</label>



<div class="card-image">


<img

src="<?=htmlspecialchars($item['image'])?>"

alt="<?=htmlspecialchars($item['name'] ?? '')?>"

>


</div>



</div>


<?php endif; ?>




<div class="form-group">


<label>

Новое фото

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
<?=($item['visible'] ?? true) ? 'checked' : ''?>>



<label for="visible">

Показывать на сайте

</label>


</div>




<div class="checkbox">


<input
id="available"
type="checkbox"
name="available"
<?=($item['available'] ?? true) ? 'checked' : ''?>>



<label for="available">

В наличии

</label>


</div>




<div class="checkbox">


<input
id="popular"
type="checkbox"
name="popular"
<?=($item['popular'] ?? false) ? 'checked' : ''?>>



<label for="popular">

Хит продаж

</label>


</div>




<button
class="btn btn-primary"
type="submit">

💾 Сохранить изменения

</button>



</form>


</div>



</main>



</div>



</body>


</html>