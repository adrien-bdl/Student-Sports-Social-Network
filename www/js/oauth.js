var url = "http://jaguar.polytechnique.fr:60471";
var client_id = "testclient";
var client_secret = "testpass";

function oAuthConnect() {
    // récupérez ici avec Jquery les valeurs contenus dans vos champs <input> du template de login
    var username = $("#login").val();
    var password = $("#mdp").val();

    //$.post("http://jaguar.polytechnique.fr:60471/login.php", { 'login': username, 'mdp': password, }, function (data) {
    //});

    return $.post(url + "/token.php", {
        client_id: client_id,
        client_secret: client_secret,
        grant_type: "password",
        username: username,
        password: password,
    });

}