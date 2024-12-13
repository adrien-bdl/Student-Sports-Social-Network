<?php

require 'headers/cors_header.php';
require 'includes/database.class.php';

if (empty($_POST['id'])) {
    $response = array('error' => 'id');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}


if (empty($_POST['pronodom']) && $_POST['pronodom']!= 0) {
    $response = array('error' => 'pas de prono domicile');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}



if (empty($_POST['pronovis'])&& $_POST['pronovis']!= 0) {
    $response = array('error' => 'pas de prono visiteur');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}


$id = $_POST['id'];
$pronodom = $_POST['pronodom'];
$pronovis = $_POST['pronovis'];

$dbh = Database::connect();
echo json_encode(Database::ajoutProno($dbh,$id,$pronodom,$pronovis));