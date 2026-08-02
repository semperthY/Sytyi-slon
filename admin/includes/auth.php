<?php

declare(strict_types=1);

require_once __DIR__ . '/config.php';

if (empty($_SESSION['logged'])) {
    header('Location: login.php');
    exit;
}