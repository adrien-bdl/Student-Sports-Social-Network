<?php

require 'headers/cors_header.php';
require 'includes/database.class.php';

if (empty($_POST['login'])) {
    $response = array('error' => 'pas de login');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}


if (empty($_POST['mdp'])) {
    $response = array('error' => 'pas de mot de passe');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}



if (empty($_POST['confmdp'])) {
    $response = array('error' => 'pas de confirmation de mot de passe');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}

if (empty($_POST['email'])) {
    $response = array('error' => 'pas de mail');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}

if (empty($_POST['nom'])) {
    $response = array('error' => 'pas de nom');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}

if (empty($_POST['prenom'])) {
    $response = array('error' => 'pas de prenom');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}
if (empty($_POST['sport'])) {
    $response = array('error' => 'pas de sport');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}
if (empty($_POST['poste'])) {
    $response = array('error' => 'pas de poste');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}

if($_POST['confmdp'] != $_POST['mdp']){
    $response = array('error' => 'les deux champs de mot de passe sont differents');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}



$login = $_POST['login'];
$mdp = $_POST['mdp'];
$email = $_POST['email'];
$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$poste = $_POST['poste'];
$sport = $_POST['sport'];

$dbh = Database::connect();

$query = "SELECT * FROM oauth_users WHERE username = ?";
$sth = $dbh->prepare($query);
$sth->execute(array($login));
$result = $sth->fetchAll(PDO::FETCH_NUM);

if (empty($result)){
  Database::ajoutuser($dbh,$login,$mdp,$email,$nom,$prenom,$sport,$poste);
echo json_encode(true);  
}
else{
    $response = array('error' => 'Utilisateur deja existant');
    echo json_encode($response);
    // pas be soin d'aller plus loin, on sort
    exit();
}