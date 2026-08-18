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
        'fried-rolls' => 'Жареные роллы',
        'onigiri' => 'Онигири',
        'sides' => 'Гарниры',
        'sets' => 'Сеты',
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
        'cold-rolls' => 'CLR',
        'baked-rolls' => 'BLR',
        'fried-rolls' => 'FRL',
        'onigiri' => 'ONI',
        'sides' => 'SID',
        'sets' => 'SET',
    ];

    $prefix = $prefixes[$category] ?? 'UNK';

    $max = 0;

    foreach ($items as $item) {
        if (!isset($item['id'])) {
            continue;
        }

        if (!preg_match('/^' . preg_quote($prefix, '/') . '(\d+)$/', (string)$item['id'], $matches)) {
            continue;
        }

        $number = (int)$matches[1];

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
        !isset($file['error']) ||
        $file['error'] !== UPLOAD_ERR_OK
    ) {
        return '';
    }

    if (
        empty($file['tmp_name']) ||
        !is_uploaded_file($file['tmp_name'])
    ) {
        return '';
    }

    if (
        isset($file['size']) &&
        (int)$file['size'] > 15 * 1024 * 1024
    ) {
        return '';
    }

    $imageInfo = @getimagesize($file['tmp_name']);

    if ($imageInfo === false) {
        return '';
    }

    [$sourceWidth, $sourceHeight, $imageType] = $imageInfo;

    if ($sourceWidth < 1 || $sourceHeight < 1) {
        return '';
    }

    $sourceImage = createImageResource(
        $file['tmp_name'],
        $imageType
    );

    if ($sourceImage === null) {
        return '';
    }

    $maxWidth = $folder === 'gallery' ? 1920 : 1200;
    $maxHeight = $folder === 'gallery' ? 1440 : 900;

    [$targetWidth, $targetHeight] = calculateImageSize(
        $sourceWidth,
        $sourceHeight,
        $maxWidth,
        $maxHeight
    );

    $targetImage = imagecreatetruecolor(
        $targetWidth,
        $targetHeight
    );

    if ($targetImage === false) {
        imagedestroy($sourceImage);
        return '';
    }

    imagealphablending($targetImage, true);
    imagesavealpha($targetImage, true);

    $background = imagecolorallocate(
        $targetImage,
        255,
        255,
        255
    );

    imagefill($targetImage, 0, 0, $background);

    $resized = imagecopyresampled(
        $targetImage,
        $sourceImage,
        0,
        0,
        0,
        0,
        $targetWidth,
        $targetHeight,
        $sourceWidth,
        $sourceHeight
    );

    imagedestroy($sourceImage);

    if (!$resized) {
        imagedestroy($targetImage);
        return '';
    }

    $directory = dirname(__DIR__, 2)
        . '/uploads/'
        . trim($folder, '/');

    if (
        !is_dir($directory) &&
        !mkdir($directory, 0755, true) &&
        !is_dir($directory)
    ) {
        imagedestroy($targetImage);
        return '';
    }

    $filename = bin2hex(random_bytes(16)) . '.webp';
    $destination = $directory . '/' . $filename;

    $saved = imagewebp(
        $targetImage,
        $destination,
        78
    );

    imagedestroy($targetImage);

    if (!$saved || !file_exists($destination)) {
        return '';
    }

    return '/uploads/'
        . trim($folder, '/')
        . '/'
        . $filename;
}

function createImageResource(
    string $file,
    int $imageType
): GdImage|null {
    return match ($imageType) {
        IMAGETYPE_JPEG => @imagecreatefromjpeg($file),
        IMAGETYPE_PNG => @imagecreatefrompng($file),
        IMAGETYPE_WEBP => @imagecreatefromwebp($file),
        default => null,
    };
}

function calculateImageSize(
    int $sourceWidth,
    int $sourceHeight,
    int $maxWidth,
    int $maxHeight
): array {
    if (
        $sourceWidth <= $maxWidth &&
        $sourceHeight <= $maxHeight
    ) {
        return [$sourceWidth, $sourceHeight];
    }

    $ratio = min(
        $maxWidth / $sourceWidth,
        $maxHeight / $sourceHeight
    );

    return [
        max(1, (int)round($sourceWidth * $ratio)),
        max(1, (int)round($sourceHeight * $ratio)),
    ];
}

function deleteImage(string $path): void
{
    if ($path === '') {
        return;
    }

    if (
        !str_starts_with($path, '/uploads/menu/') &&
        !str_starts_with($path, '/uploads/gallery/')
    ) {
        return;
    }

    $file = dirname(__DIR__, 2) . $path;

    if (is_file($file)) {
        unlink($file);
    }
}

function now(): string
{
    return date(DATE_ATOM);
}