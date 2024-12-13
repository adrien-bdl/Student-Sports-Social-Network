<?php
require 'headers/cors_header.php';
require 'includes/database.class.php';

if (empty($_POST['scorevis']) && $_POST['scorevis'] !=0) {
    $response = array('error' => 'pas de score visiteur');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}

if (empty($_POST['scoredom']) && $_POST['scoredom'] !=0) {
    $response = array('error' => 'pas de score visiteur');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}
if (empty($_POST['id'])){
    $response = array("error' => 'pas d'id");
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}

$id = $_POST['id'];
$scorevis = $_POST['scorevis'];
$scoredom = $_POST['scoredom'];

$dbh = Database::connect();
echo json_encode(Database::ajouterscore($dbh,$id,$scorevis,$scoredom));