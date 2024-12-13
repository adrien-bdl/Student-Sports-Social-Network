<?php

require 'headers/cors_header.php';
require 'includes/database.class.php';

$Trierparfutur = $_POST['Trierparfutur'];

$dbh = Database::connect();
$matchs = Database::getmatchsparSPORT($dbh, $Trierparfutur);

echo json_encode($matchs);