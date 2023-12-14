<?php
require '../data/connection.php';
$availableRoutes = ['homepage', 'game'];
$route = 'homepage';
if (isset($_GET['page']) && in_array($_GET['page'], $availableRoutes)) {
    $route = $_GET['page'];
}

require '../views/layout.php';