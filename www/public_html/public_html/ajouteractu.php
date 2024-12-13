<?php

require 'headers/cors_header.php';
require 'includes/database.class.php';

if (empty($_POST['sport'])) {
    $response = array('error' => 'Remplir le champ sport');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}

if (empty($_POST['contenu'])) {
    $response = array('error' => 'Pas de contenu');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}

$sport = $_POST['sport'];
$contenu = $_POST['contenu'];
$login = $_POST['login'];

$dbh = Database::connect();
$nom = Database::infojoueurlogin($dbh,$login)[0]['nom'];
$prenom = Database::infojoueurlogin($dbh,$login)[0]['prenom'];
Database::ajoutActu($dbh,$sport, "$prenom $nom", $contenu);
echo json_encode(true);