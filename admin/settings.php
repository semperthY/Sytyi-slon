<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';

if (empty($_SESSION['settings_csrf'])) {
    $_SESSION['settings_csrf'] = bin2hex(random_bytes(32));
}

$csrf = (string)$_SESSION['settings_csrf'];

$defaultSettings = [
    'restaurantName' => 'Сытый слонъ',
    'phones' => [
        [
            'title' => 'Администратор',
            'number' => '+7 (901) 055-24-24',
        ],
        [
            'title' => 'Михаил',
            'number' => '+7 (901) 274-30-30',
        ],
        [
            'title' => 'Михаил',
            'number' => '+7 (906) 634-76-56',
        ],
    ],
    'email' => '',
    'address' => 'рп. Некрасовское, Курортный переулок, д. 1',
    'workingHours' => '08:00 - 20:00',
    'maps' => [
        'yandex' => 'https://yandex.ru/maps/10841/yaroslavl-oblast/house/kurortny_pereulok_1/YEkYdQFmSEQFQFttfXp2dH5gYA==/?ll=40.365684%2C57.674388&z=16',
        'gis2' => '',
    ],
];

function settingsEscape(string $value): string
{
    return htmlspecialchars(
        $value,
        ENT_QUOTES | ENT_SUBSTITUTE,
        'UTF-8'
    );
}

function settingsValue(array $settings, string $key, string $default = ''): string
{
    $value = $settings[$key] ?? $default;

    return is_string($value) ? $value : $default;
}

function settingsPhone(array $settings, int $index): array
{
    $phones = $settings['phones'] ?? [];

    if (!is_array($phones)) {
        return [
            'title' => '',
            'number' => '',
        ];
    }

    $phone = $phones[$index] ?? [];

    if (!is_array($phone)) {
        return [
            'title' => '',
            'number' => '',
        ];
    }

    return [
        'title' => isset($phone['title']) && is_string($phone['title'])
            ? $phone['title']
            : '',
        'number' => isset($phone['number']) && is_string($phone['number'])
            ? $phone['number']
            : '',
    ];
}

function settingsMap(array $settings, string $key): string
{
    $maps = $settings['maps'] ?? [];

    if (!is_array($maps)) {
        return '';
    }

    $value = $maps[$key] ?? '';

    return is_string($value) ? $value : '';
}

$storedSettings = readJson(SETTINGS_FILE);

$settings = array_replace_recursive(
    $defaultSettings,
    $storedSettings
);

$message = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postedCsrf = (string)($_POST['csrf'] ?? '');

    if (!hash_equals($csrf, $postedCsrf)) {
        http_response_code(403);
        exit('Недействительный CSRF-токен.');
    }

    $restaurantName = trim(
        (string)($_POST['restaurantName'] ?? '')
    );

    $email = trim(
        (string)($_POST['email'] ?? '')
    );

    $address = trim(
        (string)($_POST['address'] ?? '')
    );

    $workingHours = trim(
        (string)($_POST['workingHours'] ?? '')
    );

    $yandexMap = trim(
        (string)($_POST['mapYandex'] ?? '')
    );

    $gis2Map = trim(
        (string)($_POST['mapGis2'] ?? '')
    );

    $phones = [];

    for ($index = 1; $index <= 3; $index++) {
        $title = trim(
            (string)($_POST['phoneTitle' . $index] ?? '')
        );

        $number = trim(
            (string)($_POST['phoneNumber' . $index] ?? '')
        );

        if ($title === '' && $number === '') {
            continue;
        }

        $phones[] = [
            'title' => $title,
            'number' => $number,
        ];
    }

    if ($restaurantName === '') {
        $error = 'Укажите название заведения.';
    } elseif ($address === '') {
        $error = 'Укажите адрес.';
    } elseif ($workingHours === '') {
        $error = 'Укажите часы работы.';
    } elseif ($phones === []) {
        $error = 'Укажите хотя бы один контактный номер.';
    } elseif (
        $email !== '' &&
        filter_var($email, FILTER_VALIDATE_EMAIL) === false
    ) {
        $error = 'Укажите корректный email.';
    } else {
        foreach ($phones as $phone) {
            if ($phone['number'] === '') {
                $error = 'У каждого контакта должен быть указан номер.';
                break;
            }
        }
    }

    $settings = [
        'restaurantName' => $restaurantName,
        'phones' => $phones,
        'email' => $email,
        'address' => $address,
        'workingHours' => $workingHours,
        'maps' => [
            'yandex' => $yandexMap,
            'gis2' => $gis2Map,
        ],
    ];

    if ($error === '') {
        if (writeJson(SETTINGS_FILE, $settings)) {
            redirect('settings.php?status=saved');
        }

        $error = 'Не удалось сохранить файл settings.json.';
    }
}

if (
    $_SERVER['REQUEST_METHOD'] !== 'POST' &&
    (string)($_GET['status'] ?? '') === 'saved'
) {
    $message = 'Настройки сохранены.';
}

$phone1 = settingsPhone($settings, 0);
$phone2 = settingsPhone($settings, 1);
$phone3 = settingsPhone($settings, 2);

?>

<!doctype html>

<html lang="ru">

<head>

<meta charset="utf-8">

<meta
    name="viewport"
    content="width=device-width,initial-scale=1"
>

<title>Настройки</title>

<link
    rel="stylesheet"
    href="assets/css/admin.css"
>

<style>

.settings-form {
    max-width: 900px;
}

.settings-section {
    margin-bottom: 24px;
    padding: 24px;
    border: 1px solid #374151;
    border-radius: 16px;
    background: #1f2937;
}

.settings-section h2 {
    margin: 0 0 20px;
    font-size: 22px;
}

.settings-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
}

.settings-field {
    min-width: 0;
}

.settings-field-full {
    grid-column: 1 / -1;
}

.settings-field label {
    display: block;
    margin-bottom: 8px;
    font-weight: 700;
    color: #f3f4f6;
}

.settings-field input,
.settings-field textarea {
    display: block;
    width: 100%;
    min-height: 48px;
    padding: 12px 14px;
    border: 1px solid #4b5563;
    border-radius: 10px;
    outline: none;
    background: #ffffff;
    color: #111827;
    font: inherit;
}

.settings-field textarea {
    min-height: 100px;
    resize: vertical;
}

.settings-field input:focus,
.settings-field textarea:focus {
    border-color: #f59e0b;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, .2);
}

.settings-help {
    margin-top: 7px;
    color: #9ca3af;
    font-size: 13px;
    line-height: 1.5;
}

.settings-phone {
    margin-bottom: 16px;
    padding: 18px;
    border: 1px solid #374151;
    border-radius: 12px;
    background: #111827;
}

.settings-phone:last-child {
    margin-bottom: 0;
}

.settings-phone-title {
    margin: 0 0 14px;
    color: #f59e0b;
    font-size: 17px;
    font-weight: 700;
}

.settings-actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.settings-save {
    min-height: 48px;
    padding: 0 24px;
    border: 0;
    border-radius: 10px;
    cursor: pointer;
    background: #f59e0b;
    color: #111827;
    font-size: 16px;
    font-weight: 800;
    transition: .2s;
}

.settings-save:hover {
    background: #fbbf24;
}

.settings-message {
    margin-bottom: 20px;
    padding: 14px 16px;
    border-radius: 10px;
}

.settings-message-success {
    border: 1px solid #16a34a;
    background: #14532d;
}

.settings-message-error {
    border: 1px solid #dc2626;
    background: #7f1d1d;
}

.settings-required {
    color: #f87171;
}

@media (max-width: 768px) {
    .settings-section {
        padding: 18px;
    }

    .settings-grid {
        grid-template-columns: 1fr;
    }

    .settings-field-full {
        grid-column: auto;
    }

    .settings-save {
        width: 100%;
    }
}

</style>

</head>

<body>

<div class="admin-layout">

<aside class="sidebar">

<h2>Сытый слонъ</h2>

<a href="dashboard.php">Главная</a>

<a href="menu.php">Меню</a>

<a href="gallery.php">Галерея</a>

<a class="active" href="settings.php">Настройки</a>

<a href="logout.php">Выход</a>

</aside>

<main class="content">

<div class="page-top">

<h1>Настройки</h1>

<a
    class="btn btn-blue"
    href="/#contacts"
    target="_blank"
    rel="noopener noreferrer"
>
    Открыть контакты
</a>

</div>

<?php if ($message !== ''): ?>

<div class="settings-message settings-message-success">
    <?= settingsEscape($message) ?>
</div>

<?php endif; ?>

<?php if ($error !== ''): ?>

<div class="settings-message settings-message-error">
    <?= settingsEscape($error) ?>
</div>

<?php endif; ?>

<form
    method="post"
    class="settings-form"
    autocomplete="off"
>

<input
    type="hidden"
    name="csrf"
    value="<?= settingsEscape($csrf) ?>"
>

<section class="settings-section">

<h2>Основная информация</h2>

<div class="settings-grid">

<div class="settings-field settings-field-full">

<label for="restaurantName">
    Название заведения
    <span class="settings-required">*</span>
</label>

<input
    id="restaurantName"
    type="text"
    name="restaurantName"
    maxlength="120"
    value="<?= settingsEscape(
        settingsValue(
            $settings,
            'restaurantName',
            'Сытый слонъ'
        )
    ) ?>"
    required
>

</div>

<div class="settings-field settings-field-full">

<label for="address">
    Адрес
    <span class="settings-required">*</span>
</label>

<textarea
    id="address"
    name="address"
    maxlength="300"
    required
><?= settingsEscape(
    settingsValue($settings, 'address')
) ?></textarea>

</div>

<div class="settings-field">

<label for="email">Email</label>

<input
    id="email"
    type="email"
    name="email"
    maxlength="180"
    value="<?= settingsEscape(
        settingsValue($settings, 'email')
    ) ?>"
    placeholder="example@mail.ru"
>

<div class="settings-help">
    Поле можно оставить пустым.
</div>

</div>

<div class="settings-field">

<label for="workingHours">
    Часы работы
    <span class="settings-required">*</span>
</label>

<input
    id="workingHours"
    type="text"
    name="workingHours"
    maxlength="120"
    value="<?= settingsEscape(
        settingsValue($settings, 'workingHours')
    ) ?>"
    placeholder="08:00 - 20:00"
    required
>

</div>

</div>

</section>

<section class="settings-section">

<h2>Контактные номера</h2>

<div class="settings-phone">

<div class="settings-phone-title">
    Контакт №1
</div>

<div class="settings-grid">

<div class="settings-field">

<label for="phoneTitle1">
    Подпись
</label>

<input
    id="phoneTitle1"
    type="text"
    name="phoneTitle1"
    maxlength="100"
    value="<?= settingsEscape($phone1['title']) ?>"
    placeholder="Администратор"
>

</div>

<div class="settings-field">

<label for="phoneNumber1">
    Номер телефона
    <span class="settings-required">*</span>
</label>

<input
    id="phoneNumber1"
    type="tel"
    name="phoneNumber1"
    maxlength="40"
    value="<?= settingsEscape($phone1['number']) ?>"
    placeholder="+7 (900) 000-00-00"
    required
>

</div>

</div>

</div>

<div class="settings-phone">

<div class="settings-phone-title">
    Контакт №2
</div>

<div class="settings-grid">

<div class="settings-field">

<label for="phoneTitle2">
    Подпись
</label>

<input
    id="phoneTitle2"
    type="text"
    name="phoneTitle2"
    maxlength="100"
    value="<?= settingsEscape($phone2['title']) ?>"
    placeholder="Михаил"
>

</div>

<div class="settings-field">

<label for="phoneNumber2">
    Номер телефона
</label>

<input
    id="phoneNumber2"
    type="tel"
    name="phoneNumber2"
    maxlength="40"
    value="<?= settingsEscape($phone2['number']) ?>"
    placeholder="+7 (900) 000-00-00"
>

</div>

</div>

</div>

<div class="settings-phone">

<div class="settings-phone-title">
    Контакт №3
</div>

<div class="settings-grid">

<div class="settings-field">

<label for="phoneTitle3">
    Подпись
</label>

<input
    id="phoneTitle3"
    type="text"
    name="phoneTitle3"
    maxlength="100"
    value="<?= settingsEscape($phone3['title']) ?>"
    placeholder="Михаил"
>

</div>

<div class="settings-field">

<label for="phoneNumber3">
    Номер телефона
</label>

<input
    id="phoneNumber3"
    type="tel"
    name="phoneNumber3"
    maxlength="40"
    value="<?= settingsEscape($phone3['number']) ?>"
    placeholder="+7 (900) 000-00-00"
>

</div>

</div>

</div>

</section>

<section class="settings-section">

<h2>Карты</h2>

<div class="settings-grid">

<div class="settings-field settings-field-full">

<label for="mapYandex">
    Ссылка на Яндекс Карты
</label>

<input
    id="mapYandex"
    type="url"
    name="mapYandex"
    maxlength="1000"
    value="<?= settingsEscape(
        settingsMap($settings, 'yandex')
    ) ?>"
    placeholder="https://yandex.ru/maps/..."
>

</div>

<div class="settings-field settings-field-full">

<label for="mapGis2">
    Ссылка на 2ГИС
</label>

<input
    id="mapGis2"
    type="url"
    name="mapGis2"
    maxlength="1000"
    value="<?= settingsEscape(
        settingsMap($settings, 'gis2')
    ) ?>"
    placeholder="https://2gis.ru/..."
>

<div class="settings-help">
    Поле можно оставить пустым.
</div>

</div>

</div>

</section>

<div class="settings-actions">

<button
    type="submit"
    class="settings-save"
>
    Сохранить настройки
</button>

</div>

</form>

</main>

</div>

</body>

</html>