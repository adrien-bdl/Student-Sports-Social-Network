<?php

require 'headers/cors_header.php';
require 'includes/database.class.php';

session_start();


$login = $_POST["login"];
$mdp = $_POST["mdp"];
$query = "SELECT * FROM `oauth_users` WHERE `username`=?";
$pdo = Database::connect();
$pdo_query = $pdo->prepare($query);
$pdo_query->execute([$login]);

$res = $pdo_query->fetch();
if (!$res) {
    $tab = ["success" => false, "error" => "login"];
} else if (password_verify($mdp, $res["mdp"])) {
    $tab["success"] = true;
    $_SESSION["loggedIn"] = true;
    $_SESSION["login"] = $login;
} else {
    $tab = ["success" => false, "error" => "password"];
}


$dbh = Database::connect();