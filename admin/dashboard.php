<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/functions.php';

?>

<!doctype html>

<html lang="ru">

<head>

<meta charset="utf-8">

<meta
name="viewport"
content="width=device-width,initial-scale=1">


<title>
Панель управления
</title>


<link
rel="stylesheet"
href="assets/css/admin.css">


<style>

.dashboard-grid {

    display:grid;

    grid-template-columns:
    repeat(auto-fit,minmax(220px,1fr));

    gap:20px;

}


.dashboard-card {

    background:#1f2937;

    border-radius:16px;

    padding:25px;

    text-decoration:none;

    color:#fff;

    transition:.2s;

    min-height:160px;

    display:flex;

    flex-direction:column;

    justify-content:center;

}


.dashboard-card:hover {

    transform:translateY(-3px);

    background:#374151;

}


.dashboard-icon {

    font-size:40px;

    margin-bottom:15px;

}


.dashboard-title {

    font-size:22px;

    font-weight:bold;

}


.dashboard-text {

    margin-top:8px;

    color:#9ca3af;

}


.logout-card {

    border:1px solid #dc2626;

}


</style>


</head>


<body>


<div class="admin-layout">


<aside class="sidebar">


<h2>
Сытый слонъ
</h2>


<a class="active" href="dashboard.php">

Главная

</a>


<a href="menu.php">

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

Панель управления

</h1>


</div>



<div class="dashboard-grid">



<a
class="dashboard-card"
href="menu.php">


<div class="dashboard-icon">

🍽

</div>


<div class="dashboard-title">

Меню

</div>


<div class="dashboard-text">

Управление блюдами и категориями

</div>


</a>




<a
class="dashboard-card"
href="gallery.php">


<div class="dashboard-icon">

🖼

</div>


<div class="dashboard-title">

Галерея

</div>


<div class="dashboard-text">

Фото блюд и заведения

</div>


</a>




<a
class="dashboard-card"
href="settings.php">


<div class="dashboard-icon">

⚙

</div>


<div class="dashboard-title">

Настройки

</div>


<div class="dashboard-text">

Контакты, адрес, режим работы

</div>


</a>




<a
class="dashboard-card logout-card"
href="logout.php">


<div class="dashboard-icon">

🚪

</div>


<div class="dashboard-title">

Выход

</div>


<div class="dashboard-text">

Завершить сессию

</div>


</a>



</div>



</main>


</div>


</body>


</html>