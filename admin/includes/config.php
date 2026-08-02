<?php

declare(strict_types=1);

define('ROOT_PATH', dirname(__DIR__, 2));

define('DATA_PATH', ROOT_PATH . '/data');
define('UPLOADS_PATH', ROOT_PATH . '/public/uploads');

define('MENU_FILE', DATA_PATH . '/menu.json');
define('GALLERY_FILE', DATA_PATH . '/gallery.json');
define('SETTINGS_FILE', DATA_PATH . '/settings.json');

define('ENV_FILE', ROOT_PATH . '/admin/.env');

session_name('slon_admin');
session_start();
define('MENU_PATH', DATA_PATH . '/menu');