<?php

require 'headers/cors_header.php';
require 'includes/database.class.php';


if (empty($_POST['joueur'])) {
    $response = array('error' => 'Remplir le champ de recherche');
    echo json_encode($response);
    // pas besoin d'aller plus loin, on sort
    exit();
}

$joueur = $_POST['joueur'];
$dbh = Database::connect();
$joueur = array(Database::infojoueur($dbh,$joueur));
echo json_encode($joueur);