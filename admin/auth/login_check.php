<?php

declare(strict_types=1);

require_once __DIR__ . '/../includes/config.php';

$env = parse_ini_file(ENV_FILE);

$login = trim($_POST['login'] ?? '');
$password = $_POST['password'] ?? '';

if (
    $login === ($env['ADMIN_LOGIN'] ?? '') &&
    password_verify($password, $env['ADMIN_PASSWORD_HASH'] ?? '')
) {
    session_regenerate_id(true);

    $_SESSION['logged'] = true;

    header('Location: ../dashboard.php');
    exit;
}

$_SESSION['login_error'] = 'Неверный логин или пароль';

header('Location: ../login.php');
exit;