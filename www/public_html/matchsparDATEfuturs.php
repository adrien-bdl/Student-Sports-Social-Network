<?php

require 'headers/cors_header.php';
require 'includes/database.class.php';

$dbh = Database::connect();
$matchs = Database::getmatchsparDATEfuturs($dbh);

echo json_encode($matchs);