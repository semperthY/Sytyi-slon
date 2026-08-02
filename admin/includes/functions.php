<?php

declare(strict_types=1);

function readJson(string $file): array
{
    if (!file_exists($file)) {
        return [];
    }

    $json = file_get_contents($file);

    if ($json === false || trim($json) === '') {
        return [];
    }

    $data = json_decode($json, true);

    return is_array($data) ? $data : [];
}

function writeJson(string $file, array $data): bool
{
    $json = json_encode(
        $data,
        JSON_PRETTY_PRINT |
        JSON_UNESCAPED_UNICODE |
        JSON_UNESCAPED_SLASHES
    );

    if ($json === false) {
        return false;
    }

    return file_put_contents($file, $json, LOCK_EX) !== false;
}

function redirect(string $url): never
{
    header("Location: {$url}");
    exit;
}

function isLogged(): bool
{
    return !empty($_SESSION['logged']);
}

function getMenuCategories(): array
{
    return [

        'salads' => 'Салаты',

        'soups' => 'Первые блюда',

        'meat' => 'Горячие блюда',

        'homemade' => 'Домашние блюда',

        'bakery' => 'Выпечка',

        'drinks' => 'Напитки',

        'cold-rolls' => 'Холодные роллы',

        'baked-rolls' => 'Запечённые роллы',

        'sides' => 'Гарниры',

        'sets' => 'Сеты'

    ];
}

function generateSku(string $category, array $items): string
{
    $prefixes = [

        'salads' => 'SAL',

        'soups' => 'SUP',

        'meat' => 'HOT',

        'homemade' => 'HOM',

        'bakery' => 'BAK',

        'drinks' => 'DRI',

        'cold-rolls' => 'CRL',

        'baked-rolls' => 'BRL',

        'sides' => 'SID',

        'sets' => 'SET'

    ];

    $prefix = $prefixes[$category] ?? 'UNK';

    $max = 0;

    foreach ($items as $item) {

        if (!isset($item['id'])) {
            continue;
        }

        if (!preg_match('/^'.$prefix.'(\d+)$/', $item['id'], $m)) {
            continue;
        }

        $number = (int)$m[1];

        if ($number > $max) {
            $max = $number;
        }

    }

    return sprintf('%s%03d', $prefix, $max + 1);
}

function uploadImage(array $file, string $folder): string
{
    if (
        empty($file) ||
        $file['error'] !== UPLOAD_ERR_OK
    ) {
        return '';
    }

    $allowed = [

        'jpg',

        'jpeg',

        'png',

        'webp'

    ];

    $ext = strtolower(
        pathinfo(
            $file['name'],
            PATHINFO_EXTENSION
        )
    );

    if (!in_array($ext, $allowed, true)) {
        return '';
    }

    $filename = bin2hex(random_bytes(16)).'.'.$ext;

    $dir = dirname(__DIR__).'/../uploads/'.$folder;

    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }

    move_uploaded_file(
        $file['tmp_name'],
        $dir.'/'.$filename
    );

    return '/uploads/'.$folder.'/'.$filename;
}

function deleteImage(string $path): void
{
    if ($path === '') {
        return;
    }

    $file = dirname(__DIR__).'/..'.$path;

    if (file_exists($file)) {
        unlink($file);
    }
}

function now(): string
{
    return date(DATE_ATOM);
}