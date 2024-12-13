<?php

class Database
{

    public static function connect()
    {
        $dbName   = 'projetsport';
        $dbServer = '127.0.0.1';
        $dbUser   = 'root';
        $dbPass   = 'Melinda';

        $dsn = 'mysql:dbname=' . $dbName . ';host=' . $dbServer;
        $dbh = null;
        try {
            $dbh = new PDO($dsn, $dbUser, $dbPass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"));
            $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            return false;
        }

        return $dbh;
    }
    public static function getidjoueuravecnompremom($dbh, $prenomespacenom)
    {
        $query = "SELECT id FROM joueurs WHERE CONCAT(prenom,nom)=REPLACE(?,' ','')";
        $sth = $dbh->prepare($query);
        $sth->execute(array($prenomespacenom));
        $result = $sth->fetchAll(PDO::FETCH_NUM);
        return $result;
    }
    public static function getjoueurs($dbh, $debutjoueur)
    {
        $n = strlen($debutjoueur);

        $query = "SELECT nom,prenom,id FROM joueurs WHERE LEFT(nom,?) = ? OR LEFT(prenom,?) = ? LIMIT 10";

        $sth = $dbh->prepare($query);

        $sth->execute(array($n, $debutjoueur, $n, $debutjoueur));

        $result = $sth->fetchAll(PDO::FETCH_NUM);

        return $result;
    }
    public static function ajouterscore($dbh, $id, $scorevis, $scoredom)
    {

        $query = "UPDATE matchs
            SET scorevis = ?
            WHERE id = ?;
            UPDATE matchs
            SET scoredom = ?
            WHERE id = ?;";
        $sth = $dbh->prepare($query);
        $sth->execute(array($scorevis, $id,$scoredom,$id));
    }

    public static function ajoutActu($dbh,$sport, $prenomnom,$contenu)
    {
        $query = "INSERT into actus VALUES (NULL,?,?,?)";
        $sth = $dbh->prepare($query);
        $sth->execute(array($sport, $prenomnom,$contenu));
    }



    public static function ajoutMatch($dbh, $sport, $genre, $date, $dateaffichage, $heure, $lieu, $ecoledom, $numecoledom, $ecolevis, $numecolevis, $type, $joueursdom, $joueursvis,$description)
    {

        $query = "INSERT into matchs VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,NULL,NULL,NULL,NULL,?)";
        $sth = $dbh->prepare($query);
        $sth->execute(array($sport, $genre, $date, $dateaffichage, $heure, $lieu, $ecoledom, $numecoledom, $ecolevis, $numecolevis, $type, $joueursdom, $joueursvis,$description));
    }

    public static function ajoutuser($dbh,$login,$mdp,$email,$nom,$prenom,$sport,$poste)
    {

        $query = "INSERT into oauth_users VALUES (?,?,?,SHA1(?),?,1,NULL);";
        $sth = $dbh->prepare($query);
        $sth->execute(array($login, $mdp, $prenom,$nom,$email));
    
        $query = "INSERT into joueurs VALUES (NULL,?,?,?,?,?,?,NULL,NULL,0,0,0,0,?,0);";
        $sth = $dbh->prepare($query);
        $sth->execute(array($nom,$prenom,$login,$mdp,$sport,$poste,$email));
    }

    public static function infojoueur($dbh, $joueur)
    {

        $query = "SELECT * FROM joueurs WHERE id = ?";

        $sth = $dbh->prepare($query);

        $sth->execute(array($joueur));

        $result = $sth->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }
    public static function infojoueurlogin($dbh, $login)
    {

        $query = "SELECT * FROM joueurs WHERE login = ?";

        $sth = $dbh->prepare($query);

        $sth->execute(array($login));

        $result = $sth->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }
    public static function getmatchsparDATEfuturs($dbh)
    {

        $query = "SELECT * FROM matchs WHERE date > CURDATE() ORDER BY date";

        $sth = $dbh->prepare($query);

        $sth->execute();

        $result = $sth->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }
    public static function getactus($dbh)
    {

        $query = "SELECT * FROM actus";

        $sth = $dbh->prepare($query);

        $sth->execute();

        $result = $sth->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }
    public static function getmatchsparDATEpasses($dbh)
    {

        $query = "SELECT * FROM matchs WHERE date < CURDATE() ORDER BY date DESC";

        $sth = $dbh->prepare($query);

        $sth->execute();

        $result = $sth->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }
    public static function getmatchsparSPORT($dbh, $Trierparfutur)
    {

        $query = "SELECT * FROM matchs WHERE sport=?";

        $sth = $dbh->prepare($query);

        $sth->execute(array($Trierparfutur));

        $result = $sth->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }
    public static function detailmatch($dbh, $id)
    {

        $query = "SELECT * FROM matchs WHERE id = ?";

        $sth = $dbh->prepare($query);

        $sth->execute(array($id));

        $result = $sth->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }

    public static function detailjoueur($dbh, $id)
    {

        $query = "SELECT nom,prenom,sport,poste,note,matchs,minutes,buts_marque,buts_encaisse,capitaine,nb_note FROM joueurs WHERE id = ?";

        $sth = $dbh->prepare($query);
        var_dump($id);
        $sth->execute(array($id));

        $result = $sth->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }
    public static function ajoutProno($dbh, $id, $pronodom, $pronovis)
    {

        $query = "INSERT into pronostics VALUES (?,NULL,?,?)";

        $sth = $dbh->prepare($query);

        $sth->execute(array($id, $pronodom, $pronovis));

        $result = $sth->fetchAll(PDO::FETCH_ASSOC);

        return true;
    }
}
