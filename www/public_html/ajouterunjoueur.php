<?php

require 'headers/cors_header.php';
require 'includes/database.class.php';


if (empty($_POST['searchjoueurs'])) {
    $response = array('error' => 'Remplir le champ de recherche');
    echo json_encode($response);
    // pas besoin d'aller plus loin, on sort
    exit();
}

$debutjoueur = $_POST['searchjoueurs'];

$dbh = Database::connect();
$joueurs = Database::getjoueurs($dbh,$debutjoueur);

echo json_encode($joueurs);