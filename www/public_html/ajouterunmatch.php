<?php

require 'headers/cors_header.php';
require 'includes/database.class.php';


if (empty($_POST['sport'])) {
    $response = array('error' => 'Remplir le champ sport');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}

if (empty($_POST['heure'])) {
    $response = array('error' => 'Remplir le champ heure');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}

if (empty($_POST['lieu'])) {
    $response = array('error' => 'Remplir le champ lieu');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}

if (empty($_POST['team1'])) {
    $response = array('error' => 'Remplir le champ ecole domicile');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}

if (empty($_POST['numteam1'])) {
    $response = array('error' => 'Remplir le numecoledom');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}

if (empty($_POST['team2'])) {
    $response = array('error' => 'Remplir le champ ecolevis');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}

if (empty($_POST['numteam2'])) {
    $response = array('error' => 'Remplir le champ numecolevis');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}
if (empty($_POST['typematch'])) {
    $response = array('error' => 'Remplir le champ type de match');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}
$ecoledom = $_POST['team1'];
$ecolevis = $_POST['team2'];

if (empty($_POST['joueursdom']) && $ecoledom == 'X'){
    $response = array('error' => 'Remplir les joueurs X');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}
if (empty($_POST['joueursvis']) && $ecolevis == 'X'){
    $response = array('error' => 'Remplir les joueurs X');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}

if (empty($_POST['dateaffichage']) && $ecolevis == 'X'){
    $response = array('error' => 'pb dateaffichage');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}
if (empty($_POST['joueursvis'])){
    $joueursvis = null;
}else{
    $joueursvis = $_POST['joueursvis'];
}

if (empty($_POST['genre'])) {
    $response = array('error' => 'Remplir le champ type de match');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}


if (empty($_POST['joueursdom'])){
    $joueursdom = null;
}else{
    $joueursdom = $_POST['joueursdom'];
}


$sport = $_POST['sport'];
$date = $_POST['date'];
$heure = $_POST['heure'];
$lieu = $_POST['lieu'];
$numecoledom = $_POST['numteam1'];
$numecolevis = $_POST['numteam2'];
$type = $_POST['typematch'];
$dateaffichage = $_POST['dateaffichage'];
$genre = $_POST['genre'];
$description = $_POST['description'];

$dbh = Database::connect();
Database::ajoutMatch($dbh,$sport,$genre,$date,$dateaffichage,$heure,$lieu,$ecoledom,$numecoledom,$ecolevis,$numecolevis,$type,$joueursdom,$joueursvis,$description);
echo json_encode(true);