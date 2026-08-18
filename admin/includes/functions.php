<?php

declare(strict_types=1);

function menuImageMapFile(): string
{
    return dirname(__DIR__, 2) . '/uploads/menu/image-map.json';
}

function readMenuImageMap(): array
{
    $file = menuImageMapFile();

    if (!is_file($file)) {
        return [];
    }

    $json = file_get_contents($file);

    if ($json === false || trim($json) === '') {
        return [];
    }

    $data = json_decode($json, true);

    return is_array($data) ? $data : [];
}

function writeMenuImageMap(array $map): bool
{
    $file = menuImageMapFile();
    $directory = dirname($file);

    if (
        !is_dir($directory) &&
        !mkdir($directory, 0755, true) &&
        !is_dir($directory)
    ) {
        return false;
    }

    $json = json_encode(
        $map,
        JSON_PRETTY_PRINT |
        JSON_UNESCAPED_UNICODE |
        JSON_UNESCAPED_SLASHES
    );

    if ($json === false) {
        return false;
    }

    return file_put_contents($file, $json, LOCK_EX) !== false;
}

function menuCategoryFromFile(string $file): string
{
    if (!defined('MENU_PATH')) {
        return '';
    }

    $menuPath = rtrim((string)MENU_PATH, '/\\');
    $directory = rtrim(dirname($file), '/\\');

    if ($directory !== $menuPath) {
        return '';
    }

    return pathinfo($file, PATHINFO_FILENAME);
}

function applyProtectedMenuImages(string $category, array $items): array
{
    if ($category === '') {
        return $items;
    }

    $map = readMenuImageMap();
    $categoryMap = $map[$category] ?? [];

    if (!is_array($categoryMap)) {
        return $items;
    }

    foreach ($items as &$item) {
        if (!is_array($item)) {
            continue;
        }

        $id = (string)($item['id'] ?? '');

        if ($id === '') {
            continue;
        }

        $protectedImage = (string)($categoryMap[$id] ?? '');

        if ($protectedImage !== '') {
            $item['image'] = $protectedImage;
        }
    }

    unset($item);

    return $items;
}

function syncProtectedMenuImages(string $category, array $items): void
{
    if ($category === '') {
        return;
    }

    $map = readMenuImageMap();

    if (!isset($map[$category]) || !is_array($map[$category])) {
        $map[$category] = [];
    }

    $changed = false;

    foreach ($items as $item) {
        if (!is_array($item)) {
            continue;
        }

        $id = (string)($item['id'] ?? '');
        $image = (string)($item['image'] ?? '');

        if (
            $id === '' ||
            $image === '' ||
            !str_starts_with($image, '/uploads/menu/')
        ) {
            continue;
        }

        if (($map[$category][$id] ?? '') !== $image) {
            $map[$category][$id] = $image;
            $changed = true;
        }
    }

    if ($changed) {
        writeMenuImageMap($map);
    }
}

function removeProtectedMenuImageByPath(string $path): void
{
    if ($path === '' || !str_starts_with($path, '/uploads/menu/')) {
        return;
    }

    $map = readMenuImageMap();
    $changed = false;

    foreach ($map as $category => $categoryMap) {
        if (!is_array($categoryMap)) {
            continue;
        }

        foreach ($categoryMap as $id => $image) {
            if ((string)$image !== $path) {
                continue;
            }

            unset($map[$category][$id]);
            $changed = true;
        }

        if ($map[$category] === []) {
            unset($map[$category]);
        }
    }

    if ($changed) {
        writeMenuImageMap($map);
    }
}

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

    if (!is_array($data)) {
        return [];
    }

    $category = menuCategoryFromFile($file);

    if ($category !== '') {
        $data = applyProtectedMenuImages($category, $data);
    }

    return $data;
}

function writeJson(string $file, array $data): bool
{
    $category = menuCategoryFromFile($file);

    if ($category !== '') {
        syncProtectedMenuImages($category, $data);
    }

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

        if (!preg_match('/^' . preg_quote($prefix, '/') . '(\\d+)$/', (string)$item['id'], $matches)) {
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

    if (str_starts_with($path, '/uploads/menu/')) {
        removeProtectedMenuImageByPath($path);
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
