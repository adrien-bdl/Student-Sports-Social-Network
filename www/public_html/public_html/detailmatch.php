<?php

require 'headers/cors_header.php';
require 'includes/database.class.php';

if (empty($_POST['id'])) {
    $response = array('error' => 'id');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}

$id = $_POST['id'];

$dbh = Database::connect();
echo json_encode(Database::detailmatch($dbh,$id));