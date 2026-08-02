<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/config.php';

if (!empty($_SESSION['logged'])) {
    header('Location: dashboard.php');
    exit;
}

$error = $_SESSION['login_error'] ?? '';
unset($_SESSION['login_error']);
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Сытый слонъ — Админка</title>

    <style>

        body{
            margin:0;
            height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            background:#111827;
            font-family:Arial,sans-serif;
        }

        .login{

            width:360px;

            background:#1f2937;

            padding:35px;

            border-radius:14px;

            color:#fff;

            box-sizing:border-box;

        }

        h1{

            margin:0 0 30px;

            text-align:center;

            font-size:28px;

        }

        input{

            width:100%;

            padding:12px;

            margin-bottom:15px;

            border:none;

            border-radius:8px;

            box-sizing:border-box;

            font-size:16px;

        }

        button{

            width:100%;

            padding:12px;

            border:none;

            border-radius:8px;

            background:#f97316;

            color:white;

            cursor:pointer;

            font-size:17px;

        }

        .error{

            color:#ef4444;

            margin-bottom:15px;

            text-align:center;

        }

    </style>

</head>

<body>

<div class="login">

<h1>Сытый слонъ</h1>

<?php if($error): ?>

<div class="error"><?=$error?></div>

<?php endif; ?>

<form action="auth/login_check.php" method="post">

<input
type="text"
name="login"
placeholder="Логин"
required>

<input
type="password"
name="password"
placeholder="Пароль"
required>

<button>Войти</button>

</form>

</div>

</body>

</html>