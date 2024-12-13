$(document).ready(function () {

  $(window).on('hashchange', route);

  function convertisseur_date(date) {
    annee = date.substr(0, 4);
    mois = date.substr(5, 2);
    jour = date.substr(8, 2);
    return jour + "/" + mois + "/" + annee
  }

  function route() {
    var hash = window.location.hash;
    switch (hash) {
      case "#login":
        document.getElementById('chatnavbas').className =
          document.getElementById('chatnavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('searchnavbas').className =
          document.getElementById('searchnavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('bellnavbas').className =
          document.getElementById('bellnavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('settingsnavbas').className =
          document.getElementById('settingsnavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('actunavbas').className =
          document.getElementById('actunavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('futursnavbas').className =
          document.getElementById('futursnavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('passesnavbas').className =
          document.getElementById('passesnavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('profilenavbas').className =
          document.getElementById('profilenavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        $.get("template/login.tpl.html", function (template) {
          $("#my-content").html(template);
          $('#connexion').on('click', function (data) {
            oAuthConnect()
              .done(function (data) {
                console.log(data['access_token']);
                if (data['access_token'] = ! null) window.localStorage.setItem("access_token", data['access_token']);
                window.sessionStorage.loggedIn = true;
                window.sessionStorage.login = $('#login').val();
                alert('Bienvenue, vous pouvez maintenant librement naviguer sur Pronostix')
                // si le tableau data contient un access_token, on l'enregistre dans un localStorage
              })
              .fail(function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                window.sessionStorage.loggedIn = false;
                console.log(err);
                alert(err.toString());
                // si l'authentification oAuth ne se passe pas bien, on récupère le message d'erreur dans le tableau err
              });
          })
        }, "html");
        break;

      case "#register":
        document.getElementById('chatnavbas').className =
          document.getElementById('chatnavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('searchnavbas').className =
          document.getElementById('searchnavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('bellnavbas').className =
          document.getElementById('bellnavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('settingsnavbas').className =
          document.getElementById('settingsnavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('actunavbas').className =
          document.getElementById('actunavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('futursnavbas').className =
          document.getElementById('futursnavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('passesnavbas').className =
          document.getElementById('passesnavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('profilenavbas').className =
          document.getElementById('profilenavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        $.get("template/register.tpl.html", function (template) {
          $("#my-content").html(template);
          let inputnom;
          let inputprenom;
          let inputsport;
          let inputposte;
          let inputmail;
          let inputlogin;
          var inputmdp;
          let inputconfmdp;
          $("#creationcompte").on("click", function () {
            inputnom = $("#inputnom").val();
            inputprenom = $("#inputprenom").val();
            inputsport = $("#inputsport").val();
            inputposte = $("#inputposte").val();
            inputmail = $("#inputmail").val();
            inputlogin = $("#inputlogin").val();
            inputmdp = $("#inputmdp").val();
            inputconfmdp = $("#inputconfmdp").val();
            console.log(inputnom);
            console.log(inputmdp);
            $.post(url + "/register.php", { 'confmdp': $("#inputconfmdp").val(), 'mdp': $("#inputmdp").val(), 'login': $("#inputlogin").val(), 'email': $("#inputmail").val(), 'sport': $("#inputsport").val(), 'poste': $("#inputposte").val(), 'nom': $("#inputnom").val(), 'prenom': $("#inputprenom").val() }, function (data) {
              console.log(data);
              if (typeof data != 'boolean') alert("Les informations ne sont pas complètes : " + data.error);
              else (alert("Votre compte a été créé avec succès"));
            });
          });
        }, "html");
        break;


      case "#chat":
        if (sessionStorage.loggedIn == 'true') {
          //const currentHash = window.location.hash;
          //idée : entourer avec une bordure l'icone de la navbar quand on est sur le template correspondant
          document.getElementById("chatnavbas").className += ' activenavbas';
          document.getElementById('searchnavbas').className =
            document.getElementById('searchnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('bellnavbas').className =
            document.getElementById('bellnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('settingsnavbas').className =
            document.getElementById('settingsnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('actunavbas').className =
            document.getElementById('actunavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('futursnavbas').className =
            document.getElementById('futursnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('passesnavbas').className =
            document.getElementById('passesnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('profilenavbas').className =
            document.getElementById('profilenavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          $.get("template/chat.tpl.html", function (template) {
            $("#my-content").html(template);
          }, "html");
        } else { window.location.href = "#connexion" }
        break;

      case "#conv":
        if (sessionStorage.loggedIn == 'true') {
          document.getElementById("chatnavbas").className += ' activenavbas';
          document.getElementById('searchnavbas').className =
            document.getElementById('searchnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('bellnavbas').className =
            document.getElementById('bellnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('settingsnavbas').className =
            document.getElementById('settingsnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('actunavbas').className =
            document.getElementById('actunavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('futursnavbas').className =
            document.getElementById('futursnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('passesnavbas').className =
            document.getElementById('passesnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('profilenavbas').className =
            document.getElementById('profilenavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          $.get("template/conv.tpl.html", function (template) {
            $("#my-content").html(template);
          }, "html");
        } else { window.location.href = "#connexion" }
        break;

      case "#bell":
        if (sessionStorage.loggedIn == 'true') {
          document.getElementById("bellnavbas").className += ' activenavbas';
          document.getElementById('searchnavbas').className =
            document.getElementById('searchnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('settingsnavbas').className =
            document.getElementById('settingsnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('actunavbas').className =
            document.getElementById('actunavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('futursnavbas').className =
            document.getElementById('futursnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('passesnavbas').className =
            document.getElementById('passesnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('chatnavbas').className =
            document.getElementById('chatnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('profilenavbas').className =
            document.getElementById('profilenavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          $.get("template/bell.tpl.html", function (template) {
            $("#my-content").html(template);
          }, "html");
        } else { window.location.href = "#connexion" }
        break;

      case "#settings":
        if (sessionStorage.loggedIn == 'true') {
          document.getElementById("settingsnavbas").className += ' activenavbas';
          document.getElementById('searchnavbas').className =
            document.getElementById('searchnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('bellnavbas').className =
            document.getElementById('bellnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('actunavbas').className =
            document.getElementById('actunavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('futursnavbas').className =
            document.getElementById('futursnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('passesnavbas').className =
            document.getElementById('passesnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('chatnavbas').className =
            document.getElementById('chatnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('profilenavbas').className =
            document.getElementById('profilenavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          $.get("template/settings.tpl.html", function (template) {
            $("#my-content").html(template);
            $("#enregistrernewmdp").on("click", function () {
              ancienmdp = $("#ancienmdp").val();
              newmdp = $("#newmdp").val();
              confnewmdp = $("#confnewmdp").val();
              $.post(url + "/changermdp.php", { 'ancienmdp': ancienmdp, 'newmdp': newmdp, 'confnewmdp': confnewmdp }, function (data) {
                if (typeof data != 'boolean') alert("Erreur : " + data.error);
                else (alert("Votre mot de passe a bien été modifié"));
              });
            });
            $('#logout').on('click', function (data) {
              window.sessionStorage.loggedIn = false;
              window.sessionStorage.login = null;
              window.location.href = "#connexion"
            });
          }, "html");
        } else { window.location.href = "#connexion" }

        break;

      case "#search":
        if (sessionStorage.loggedIn == 'true') {
          document.getElementById("searchnavbas").className += ' activenavbas';
          document.getElementById('bellnavbas').className =
            document.getElementById('bellnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('settingsnavbas').className =
            document.getElementById('settingsnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('actunavbas').className =
            document.getElementById('actunavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('futursnavbas').className =
            document.getElementById('futursnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('passesnavbas').className =
            document.getElementById('passesnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('chatnavbas').className =
            document.getElementById('chatnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('profilenavbas').className =
            document.getElementById('profilenavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          $.get("template/search.tpl.html", function (template) {
            $("#my-content").html(template);
            $("#searchdesjoueurs").on("click", function () {
              searchdesjoueurs = $("#inputsearch").val();
              $.post(url + "/ajouterunjoueur.php", { 'searchjoueurs': searchdesjoueurs }, function (data) {
                var personne = '';

                for (let i = 0; i < data.length; i++) {
                  var nomprenom = data[i][1] + ' ' + data[i][0];
                  personne += "<button type='button' class= 'list-group-item list-group-item-action joueurdelarecherche'" + "id = '" + data[i][2] + "' data-id='" + data[i][2] + "'>" + nomprenom + "</button>";
                }
                $("#resultsearch").html(personne);
                $('.joueurdelarecherche').on("click", function () {
                  $.post(url + "/detailjoueur.php", { 'id': $(this).data('id') }, function (datas) {
                    $.get("template/profile.tpl.html", function (template) {
                      content = Mustache.render(template, datas);
                      $("#my-content").html(content)
                    }, "text");
                  });
                });
              });
            });

            $("#searchdesmatchs").on("click", function () {
              searchdesmatchs = $("#inputsearch").val();
              $.post(url + "/searchdesmatchs.php", { 'searchmatchs': searchdesmatchs }, function (data) {
                var personne = '';

                for (let i = 0; i < data.length; i++) {
                  var nomprenom = data[i][1] + ' ' + data[i][0];
                  personne += "<button type='button' class= 'list-group-item list-group-item-action matchdelarecherche'" + "id = '" + data[i][2] + "' data-id='" + data[i][2] + "'>" + nomprenom + "</button>";
                }
                $("#resultsearch").html(personne);

                $('.matchdelarecherche').on("click", function () {
                  joueursdomi.push({ joueur: $(this).text(), id: $(this).data('id') });
                  listeiddom.push($(this).data('id'));
                  $.post(url + "/fichematch.php", { 'id': $(this).data('id') }, function (data) {
                    $.get("template/match.tpl.html", function (template) {
                      content = Mustache.render(template, joueursdomi);
                      $("#profilclique").html(content)
                    }, "text");
                  });
                }, "html");
              });
            });
          }, "html");
        } else { window.location.href = "#connexion" }
        break;

      case "#profile":
        if (sessionStorage.loggedIn == 'true') {
          document.getElementById("profilenavbas").className += ' activenavbas';
          document.getElementById('searchnavbas').className =
            document.getElementById('searchnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('bellnavbas').className =
            document.getElementById('bellnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('settingsnavbas').className =
            document.getElementById('settingsnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('chatnavbas').className =
            document.getElementById('chatnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('futursnavbas').className =
            document.getElementById('futursnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('passesnavbas').className =
            document.getElementById('passesnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('actunavbas').className =
            document.getElementById('actunavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          $.get("template/profile.tpl.html", function (template) {
            //récupérer l'id du joueur connecté
            $.post(url + "/detailjoueurlogin.php", { 'login': sessionStorage.login }, function (data) {
              content = Mustache.render(template, data);
              $("#my-content").html(content);
            });
          }, "html");
        } else { window.location.href = "#connexion" }
        break;

      case "#score":
        if (sessionStorage.loggedIn == 'true') {
          document.getElementById('futursnavbas').className =
            document.getElementById('futursnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('searchnavbas').className =
            document.getElementById('searchnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('bellnavbas').className =
            document.getElementById('bellnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('settingsnavbas').className =
            document.getElementById('settingsnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('chatnavbas').className =
            document.getElementById('chatnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('actunavbas').className =
            document.getElementById('actunavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('passesnavbas').className =
            document.getElementById('passesnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('profilenavbas').className =
            document.getElementById('profilenavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          $.get("template/score.tpl.html", function (template) {
            $("#my-content").html(template);
            $("#ajoutscore").on("click", function (data) {
              $.post(url + "/ajoutscore.php", { 'id': id_match, 'scorevis': $('#ajoutscorevis').val(), 'scoredom': $('#ajoutscoredom').val() }, function (data) {
                window.location.href = "#match";
              });
            });
          }, "html");
        } else { window.location.href = "#connexion" }
        break;

      case "#passes":
        if (sessionStorage.loggedIn == 'true') {
          document.getElementById("passesnavbas").className += ' activenavbas';
          document.getElementById('searchnavbas').className =
            document.getElementById('searchnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('bellnavbas').className =
            document.getElementById('bellnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('settingsnavbas').className =
            document.getElementById('settingsnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('chatnavbas').className =
            document.getElementById('chatnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('futursnavbas').className =
            document.getElementById('futursnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('actunavbas').className =
            document.getElementById('actunavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('profilenavbas').className =
            document.getElementById('profilenavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          $.get("template/passes.tpl.html", function (template) {
            $.getJSON(url + "/matchsparDATEpasses.php", function (data) {
              console.log(data);
              content = Mustache.render(template, data);
              $("#my-content").html(content);
              $(".boutonpourchargermatch").on("click", function (data) {
                id_match = $(this).data("id");
                console.log(id_match);
              });
              $("#Trierpardatefuturs").on("click", function (data) {
                Trierparfuturs = $("#Trierpardatefuturs").val();
                console.log(Trierparfuturs);
                $.getJSON(url + "/matchsparDATEpasses.php", function (data) {
                  console.log(data);
                  content = Mustache.render(template, data);
                  $("#my-content").html(content);
                  $(".boutonpourchargermatch").on("click", function (data) {
                    id_match = $(this).data("id");
                    console.log(id_match);
                  });
                });
              });
              $(".Trierparfutur").on("click", function (data) {
                Trierparfutur = $(".Trierpardatefutur").val();
                console.log(Trierparfutur);
                if (Trierparfutur == "Autres") {
                  //trier par date en éliminant les sports conventionnels
                }
                else {
                  $.post(url + "/matchsparSPORT.php", { 'Trierparfutur': Trierparfutur }, function (data) {
                    console.log(data);
                    content = Mustache.render(template, data);
                    $("#my-content").html(content);
                    $(".boutonpourchargermatch").on("click", function (data) {
                      id_match = $(this).data("id");
                      console.log(id_match);
                    });
                  });
                }
              });
            });
          }, "html");
        } else { window.location.href = "#connexion" }
        break;

      case "#futurs":
        if (sessionStorage.loggedIn == 'true') {
          document.getElementById("futursnavbas").className += ' activenavbas';
          document.getElementById('searchnavbas').className =
            document.getElementById('searchnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('bellnavbas').className =
            document.getElementById('bellnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('settingsnavbas').className =
            document.getElementById('settingsnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('chatnavbas').className =
            document.getElementById('chatnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('actunavbas').className =
            document.getElementById('actunavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('passesnavbas').className =
            document.getElementById('passesnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('profilenavbas').className =
            document.getElementById('profilenavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          $.get("template/futurs.tpl.html", function (template) {
            $.getJSON(url + "/matchsparDATEfuturs.php", function (data) {
              console.log(data);
              content = Mustache.render(template, data);
              $("#my-content").html(content);
              $(".boutonpourchargermatch").on("click", function (data) {
                id_match = $(this).data("id");
                console.log(id_match);
              });
              $("#Trierpardatefuturs").on("click", function (data) {
                Trierparfuturs = $("#Trierpardatefuturs").val();
                console.log(Trierparfuturs);
                $.getJSON(url + "/matchsparDATEfuturs.php", function (data) {
                  console.log(data);
                  content = Mustache.render(template, data);
                  $("#my-content").html(content);
                  $(".boutonpourchargermatch").on("click", function (data) {
                    id_match = $(this).data("id");
                    console.log(id_match);
                  });
                });
              });
              $(".Trierparfutur").on("click", function (data) {
                Trierparfutur = $(".Trierpardatefutur").val();
                console.log(Trierparfutur);
                if (Trierparfutur == "Autres") {
                  //trier par date en éliminant les sports conventionnels
                }
                else {
                  $.post(url + "/matchsparSPORT.php", { 'Trierparfutur': Trierparfutur }, function (data) {
                    console.log(data);
                    content = Mustache.render(template, data);
                    $("#my-content").html(content);
                    $(".boutonpourchargermatch").on("click", function (data) {
                      id_match = $(this).data("id");
                      console.log(id_match);
                    });
                  });
                }
              });
            });
          }, "html");
        } else { window.location.href = "#connexion" }
        break;

      case "#joueur":
        if (sessionStorage.loggedIn == 'true') {
          document.getElementById('searchnavbas').className =
            document.getElementById('searchnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('bellnavbas').className =
            document.getElementById('bellnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('settingsnavbas').className =
            document.getElementById('settingsnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('actunavbas').className =
            document.getElementById('actunavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('futursnavbas').className =
            document.getElementById('futursnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('passesnavbas').className =
            document.getElementById('passesnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('chatnavbas').className =
            document.getElementById('chatnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('profilenavbas').className =
            document.getElementById('profilenavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          $.get("template/joueur.tpl.html", function (template) {
            $.post(url + "/detailjoueur.php", { 'id': id_joueur }, function (data) {
              content = Mustache.render(template, data);
              $("#my-content").html(content);
            });
          }, "html");
        } else { window.location.href = "#connexion" }
        break;

      case "#match":
        if (sessionStorage.loggedIn == 'true') {
          document.getElementById('actunavbas').className =
            document.getElementById('actunavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('futursnavbas').className =
            document.getElementById('futursnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('bellnavbas').className =
            document.getElementById('bellnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('settingsnavbas').className =
            document.getElementById('settingsnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('passesnavbas').className =
            document.getElementById('passesnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('chatnavbas').className =
            document.getElementById('chatnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('profilenavbas').className =
            document.getElementById('profilenavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('searchnavbas').className =
            document.getElementById('searchnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          $.get("template/match.tpl.html", function (template) {
            $.post(url + "/detailmatch.php", { 'id': id_match }, function (data) {
              if (data[0]['joueursdom'] == null) data[0]['joueursdom'] = "Pas d'équipe renseignée";
              else {
                var listeidmatchdom = data[0]['joueursdom'].split(',');

                data[0]['joueursdom'] = "";
              }
              if (data[0]['joueursvis'] == null) data[0]['joueursvis'] = "Pas d'équipe renseignée";
              else {
                var listeidmatchvis = data[0]['joueursvis'].split(',');

                data[0]['joueursvis'] = "";
              }

              content = Mustache.render(template, data);
              $("#my-content").html(content);
              // Récupération de la date actuelle
              let dateActuelle = new Date();
              let dateISO = dateActuelle.toISOString();
              let dateAAAMMJJ = dateISO.slice(0, 10);
              let datematch = document.getElementById('recuperationdate').innerHTML;
              let dateConvertiematch = datematch.replace(/-/g, '');
              let dateConvertieactuelle = dateAAAMMJJ.replace(/-/g, '');

              // Comparaison des dates
              if (dateConvertieactuelle > dateConvertiematch) {
                // Affichage de la div
                document.getElementById('boutonpourajouterscore').style.display = 'block';
                document.getElementById('showscoredom').style.display = 'block';
                document.getElementById('showscorevis').style.display = 'block';
                document.getElementById('prono').style.display = 'none';
                document.getElementById('scoreequipedom').style.display = 'none';
                document.getElementById('scoreequipevis').style.display = 'none';
              }
              else {
                // Affichage de la div
                document.getElementById('boutonpourajouterscore').style.display = 'none';
                document.getElementById('showscoredom').style.display = 'none';
                document.getElementById('showscorevis').style.display = 'none';
                document.getElementById('prono').style.display = 'block';
                document.getElementById('scoreequipedom').style.display = 'block';
                document.getElementById('scoreequipevis').style.display = 'block';
              }

              var listejoueurdom = [];
              var fetchPromises = [];

              for (let i = 0; i < listeidmatchdom.length; i++) {
                const promise = new Promise(function (resolve, reject) {
                  $.post(url + "/detailjoueur.php", { 'id': listeidmatchdom[i] }, function (infojoueur) {
                    if (infojoueur && infojoueur[0]) {
                      resolve(infojoueur[0]['prenom'] + ' ' + infojoueur[0]['nom']);
                    } else {
                      reject(new Error("Informations du joueur non trouvées pour l'ID " + listeidmatchdom[i]));
                    }
                  });
                });

                fetchPromises.push(promise);
              }

              Promise.all(fetchPromises)
                .then(playerNames => {
                  listejoueurdom = playerNames.join(', ');
                  $('#jdom').html(listejoueurdom);
                })

              var listejoueurvis = [];
              var fetchPromises = [];

              for (let i = 0; i < listeidmatchvis.length; i++) {
                const promise = new Promise(function (resolve, reject) {
                  $.post(url + "/detailjoueur.php", { 'id': listeidmatchvis[i] }, function (infojoueur) {
                    if (infojoueur && infojoueur[0]) {
                      resolve(infojoueur[0]['prenom'] + ' ' + infojoueur[0]['nom']);
                    }
                  });
                });

                fetchPromises.push(promise);
              }

              Promise.all(fetchPromises)
                .then(playerNames => {
                  listejoueurvis = playerNames.join(', ');
                  $('#jvis').html(listejoueurvis);
                })

              $("#prono").on("click", function (data) {
                $.post(url + "/pronostic.php", { 'pronodom': $('#scoreequipedom').val(), 'pronovis': $('#scoreequipevis').val(), 'id': id_match }, function (data) {
                  if (data == true) {
                    alert('Votre pronostic est bien enregistré');
                  }
                  else {
                    alert("Remplir correctement le score");
                  }
                });
              });
              $(".boutonpourchargerjoueur").on("click", function (data) {
                id_joueur = $(this).data("id");
              });
              $("#boutonpourajouterscore").on("click", function (data) {
                id_match = $(this).data("id");
                console.log(id_match);
              });
            });

          }, "html");
        } else { window.location.href = "#connexion" }
        break;

      case "#ajoutmatch":
        if (sessionStorage.loggedIn == 'true') {
          document.getElementById('searchnavbas').className =
            document.getElementById('searchnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('bellnavbas').className =
            document.getElementById('bellnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('settingsnavbas').className =
            document.getElementById('settingsnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('actunavbas').className =
            document.getElementById('actunavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('futursnavbas').className =
            document.getElementById('futursnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('passesnavbas').className =
            document.getElementById('passesnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('chatnavbas').className =
            document.getElementById('chatnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('profilenavbas').className =
            document.getElementById('profilenavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          $.get("template/ajoutmatch.tpl.html", function (template) {
            $("#my-content").html(template);
            let sport;
            let date;
            let heure;
            let lieu;
            let team1;
            let numteam1;
            let team2;
            let numteam2;
            let typematch;
            let joueursdom;
            let joueursvis;
            let searchjoueurs;
            let prenom;
            let nom;
            let joueursvisi = [];
            let listeidvis = [];
            let listeiddom = [];
            let joueursdomi = [];
            let description;
            $("#searchdom").on("click", function () {
              searchjoueurs = $("#searchjoueursdom").val();
              $.post(url + "/ajouterunjoueur.php", { 'searchjoueurs': searchjoueurs }, function (data) {
                var personne = '';

                for (let i = 0; i < data.length; i++) {
                  var nomprenom = data[i][1] + ' ' + data[i][0];
                  personne += "<button type='button' onclick='displayValuedom(" + data[i][2] + ")' class= 'list-group-item list-group-item-action ajoutjoueurlistedom'" + "id = '" + data[i][2] + "' data-id='" + data[i][2] + "'>" + nomprenom + "</button>";
                }
                $("#joueursdom").html(personne);

                $('.ajoutjoueurlistedom').on("click", function () {
                  joueursdomi.push({ joueur: $(this).text(), id: $(this).data('id') });
                  listeiddom.push($(this).data('id'));
                  $.get("template/listejoueurdomajoutmatch.tpl.html", function (template) {
                    content = Mustache.render(template, joueursdomi);
                    $("#listejoueurdom").html(content)

                    $('.enlevejoueurdom').on("click", function () {
                      $.get("template/listejoueurdomajoutmatch.tpl.html", function (template) {
                        content = Mustache.render(template, joueursdomi);
                        $("#listejoueurdom").html(content);
                      }, "text");
                      let joueur = $(this).text();
                      for (let i = 0; i < joueursdomi.length; i++) {
                        if (joueursdomi[i]['joueur'] == joueur) {
                          joueursdomi.pop(i);
                          listeiddom.pop(i);
                        }
                      }
                      $.get("template/listejoueurdomajoutmatch.tpl.html", function (template) {
                        content = Mustache.render(template, joueursdomi);
                        $("#listejoueurdom").html(content);
                      }, "text");
                    });
                  }, "text");
                });

              });
            });
            $("#searchvis").on("click", function () {
              searchjoueurs = $("#searchjoueursvis").val();
              $.post(url + "/ajouterunjoueur.php", { 'searchjoueurs': searchjoueurs }, function (data) {
                var personne = '';

                for (let i = 0; i < data.length; i++) {
                  var nomprenom = data[i][1] + ' ' + data[i][0];
                  personne += "<button type='button' onclick='displayValuevis(" + data[i][2] + ")' class= 'list-group-item list-group-item-action ajoutjoueurlistevis'" + "id = '" + data[i][2] + "' data-id='" + data[i][2] + "'>" + nomprenom + "</button>";
                }
                $("#joueursvis").html(personne);

                $('.ajoutjoueurlistevis').on("click", function () {
                  joueursvisi.push({ joueur: $(this).text(), id: $(this).data('id') });
                  listeidvis.push($(this).data('id'));
                  console.log(joueursvisi);
                  $.get("template/listejoueurvisajoutmatch.tpl.html", function (template) {
                    content = Mustache.render(template, joueursvisi);
                    $("#listejoueurvis").html(content)

                    $('.enlevejoueurvis').on("click", function () {    // peut être à enlever moins stylé mais on se casse aps la tête
                      $.get("template/listejoueurvisajoutmatch.tpl.html", function (template) {
                        content = Mustache.render(template, joueursvisi);
                        $("#listejoueurvis").html(content);
                      }, "text");
                      let joueur = $(this).text();
                      for (let i = 0; i < joueursvisi.length; i++) {
                        if (joueursvisi[i]['joueur'] == joueur) {
                          joueursvisi.pop(i);
                          listeidvis.pop(i);
                        }
                      }
                      $.get("template/listejoueurvisajoutmatch.tpl.html", function (template) {
                        content = Mustache.render(template, joueursvisi);
                        $("#listejoueurvis").html(content);
                      }, "text");
                    });
                  }, "text");
                });

              });
            });


            $("#ajoutmatch").on("click", function () {
              sport = $("#sport").val();
              genre = $("#genre").val();
              date = $("#date").val();
              dateaffichage = convertisseur_date($("#date").val());
              heure = $("#heure").val();
              lieu = $("#lieu").val();
              description = $("#description").val();
              //type de match
              if ($("#typematch").val() == "Amical") { typematch = $("#typematch").val() }
              if ($("#typematch").val() == "Championnat") { typematch = "Championnat" + " " + $("#choixdiv").val() }
              if ($("#typematch").val() == "Coupe") { typematch = $("#nomcoupe").val() + " " + $("#choixtourcoupe").val() }
              if ($("#typematch").val() == "Tournois") { typematch = $("#nomtournois").val() + " " + $("#choixtourtour").val() }
              //équipe 1
              if ($("#team1").val() == "Autre") { team1 = $("#amasquer1").val() }
              else { team1 = $("#team1").val() }
              numteam1 = $("#numteam1").val();
              //équipe 2
              if ($("#team2").val() == "Autre") { team2 = $("#amasquer2").val() }
              else { team2 = $("#team2").val() }
              numteam2 = $("#numteam2").val();
              console.log(listeiddom);
              console.log(listeidvis);
              listeiddom = listeiddom.toString();
              listeidvis = listeidvis.toString();
              $.post(url + "/ajouterunmatch.php", { 'sport': sport, 'genre': genre, 'date': date, 'dateaffichage': dateaffichage, 'heure': heure, 'lieu': lieu, 'team1': team1, 'numteam1': numteam1, 'team2': team2, 'numteam2': numteam2, 'typematch': typematch, 'joueursdom': listeiddom, 'joueursvis': listeidvis, 'description': description }, function (data) {
                if (typeof data != 'boolean') alert("Les informations ne sont pas complètes : " + data.error);
                else (alert("Le match a bien été ajouté"));
              });
            });
          }, "html");
        } else { window.location.href = "#connexion" }
        break;

      case "#actus":
        if (sessionStorage.loggedIn == 'true') {
          document.getElementById("actunavbas").className += ' activenavbas';
          document.getElementById('searchnavbas').className =
            document.getElementById('searchnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('bellnavbas').className =
            document.getElementById('bellnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('settingsnavbas').className =
            document.getElementById('settingsnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('chatnavbas').className =
            document.getElementById('chatnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('futursnavbas').className =
            document.getElementById('futursnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('passesnavbas').className =
            document.getElementById('passesnavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          document.getElementById('profilenavbas').className =
            document.getElementById('profilenavbas')
              .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
          $.get("template/actus.tpl.html", function (template) {
            $.getJSON(url + "/actus.php", function (data) {
              console.log(data);
              content = Mustache.render(template, data);
              $("#my-content").html(content);
              $("#buttonpostactu").on("click", function () {
                contenu = $("#contenueactu").val();
                if ($("#sportactu").val() == "AUTRES") { sport = $("#amasqueractu1").val() }
                else { sport = $("#sportactu").val() }
                login = sessionStorage.login;
                $.post(url + "/ajouteractu.php", { 'contenu': contenu, 'sport': sport, 'login': login }, function (data) {
                  if (typeof data != 'boolean') alert("Les informations ne sont pas complètes : " + data.error);
                  else (alert("Votre actu a bien été ajouté"));
                });
                $.get("template/actus.tpl.html", function (template) {
                  $.getJSON(url + "/actus.php", function (data) {
                    console.log(data);
                    content = Mustache.render(template, data);
                    $("#my-content").html(content);
                  });
                }, "html");
              });
            });
          }, "html");
        } else { window.location.href = "#connexion" }
        break;

      default:
        document.getElementById('actunavbas').className =
          document.getElementById('actunavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('futursnavbas').className =
          document.getElementById('futursnavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('bellnavbas').className =
          document.getElementById('bellnavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('settingsnavbas').className =
          document.getElementById('settingsnavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('passesnavbas').className =
          document.getElementById('passesnavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('chatnavbas').className =
          document.getElementById('chatnavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('profilenavbas').className =
          document.getElementById('profilenavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        document.getElementById('searchnavbas').className =
          document.getElementById('searchnavbas')
            .className.replace(/(?:^|\s)activenavbas(?!\S)/g, '')
        $.get("template/connexion.tpl.html", function (template) {
          $("#my-content").html(template);
        }, "html");
    }
  }

  route();
});


/* Voici la fonction javascript qui change la propriété "display"
pour afficher ou non le div selon que ce soit "none" ou "block". */
/*cache et réaffiche quand on appuie dessus*/
function masquer_div(id) {
  if (document.getElementById(id).style.display == 'none') {
    document.getElementById(id).style.display = 'block';
  }
  else {
    document.getElementById(id).style.display = 'none';
  }
}
function gardermasquer_div(id) {
  if (document.getElementById(id).style.display == 'none') {
    document.getElementById(id).style.display = 'none';
  }
  else {
    document.getElementById(id).style.display = 'none';
  }
}
function montrer_div(id) {
  if (document.getElementById(id).style.display == 'none') {
    document.getElementById(id).style.display = 'block';
  }
  else {
    document.getElementById(id).style.display = 'block';
  }
}

function displayValuedom(dataid) {
  var radios = document.getElementById(dataid);
  var result = document.getElementById("resultdom");
  result.innerHTML = radios.innerHTML + " a bien été ajouté";
}

function displayValuevis(dataid) {
  var radios = document.getElementById(dataid);
  var result = document.getElementById("resultvis");
  result.innerHTML = radios.innerHTML + " a bien été ajouté";
}
