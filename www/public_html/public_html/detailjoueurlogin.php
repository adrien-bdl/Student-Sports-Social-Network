<?php
require 'headers/cors_header.php';
require 'includes/database.class.php';

if (empty($_POST['login'])){
    $response = array("error' => 'pas d'id");
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}

$login = $_POST['login'];

$dbh = Database::connect();
echo json_encode(Database::infojoueurlogin($dbh,$login));