// REQUETES GET
function getRequest1() {
	let url = "/api/shops";

	fetch(url)
		.then(function(responseJSON) {
        	responseJSON.json()
        	.then(function(res) {
                // Maintenant res est un vrai objet JavaScript
        		afficheReponseGET(res);
        	});
    	})
    	.catch(function (err) {
        	console.log(err);
    });
}

// REQUETES POST
function postRequest(event) {
    // Pour éviter que la page ne se ré-affiche
    event.preventDefault();

    // Récupération du formulaire
    // qui a généré l'événement
    let form = event.target;

    // Récupération des valeurs des champs du formulaire
    // en prévision d'un envoi multipart en ajax/fetch
    let donneesFormulaire = new FormData(form);

    let url = "/api/shops";

    fetch(url, {
        method: "POST",
        body: donneesFormulaire
    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponsePOST(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

// REQUETES POST
function postRequest(event) {
    // Pour éviter que la page ne se ré-affiche
    event.preventDefault();

    // Récupération du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a généré
    // l'événement
    let form = event.target;

    // Récupération des valeurs des champs du formulaire
    // en prévision d'un envoi multipart en ajax/fetch
    let donneesFormulaire = new FormData(form);

    let url = "/api/shops";

    fetch(url, {
        method: "POST",
        body: donneesFormulaire
    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponsePOST(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}


// REQUETES PUT
function putRequest(event) {
    // Pour éviter que la page ne se ré-affiche
    event.preventDefault();

    // Récupération du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a généré
    // l'événement
    let form = event.target;
    // Récupération des valeurs des champs du formulaire
    // en prévision d'un envoi multipart en ajax/fetch
    let donneesFormulaire = new FormData(event.target);

    let id = form._id.value; 

    let url = "/api/shops/" + id;

    fetch(url, {
        method: "PUT",
        body: donneesFormulaire
    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponsePUT(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}

// REQUETES DELETE
function deleteRequest(event) {
    // Pour éviter que la page ne se ré-affiche
    event.preventDefault();

    // Récupération du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a généré
    // l'événement
    let form = event.target;
 
    let id = form._id.value; // on peut aller chercher la valeur
                             // d'un champs d'un formulaire
                             // comme cela, si on connait le nom
                             // du champ (valeur de son attribut name)

    envoieRequeteFetchDelete(id);
}

function envoieRequeteFetchDelete(id) {
    let url = "/api/shops/" + id;

    fetch(url, {
        method: "DELETE",
    })
    .then(function(responseJSON) {
        responseJSON.json()
            .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                afficheReponseDELETE(res);
            });
        })
        .catch(function (err) {
            console.log(err);
    });
}
//-------------------------------
// Affichage d'une réponse JSON
function afficheReponseGET(reponse) {
    let div = document.querySelector("#reponseGET");
    div.innerHTML = reponse.msg;

    // Dans reponse.data j'ai les shops
    afficheShopsEnTable(reponse.data);
}

function afficheReponsePOST(reponse) {
    let div = document.querySelector("#reponsePOST");
    div.innerHTML = reponse.msg;
}

function afficheReponsePUT(reponse) {
    let div = document.querySelector("#reponsePUT");
    div.innerHTML = reponse.msg;

    // On affiche le tableau à jour
    getRequest1();
}

function afficheReponseDELETE(reponse) {
    let div = document.querySelector("#reponseDELETE");
    div.innerHTML = reponse.msg;
}

//------------ ici fonction pour creer tableau
function afficheShopsEnTable(shops) {
    console.log("creation du tableau");

    // On cree un tableau
    let table = document.createElement("table");

    // Je cree une ligne
    for(var i=0; i < shops.length; i++) {
        let ligne = table.insertRow();
        ligne.id = "shop" + i;

        let shop = shops[i];
        let nom = shop.name;
        let distance = shop.distance;

        let celluleNom = ligne.insertCell();
        celluleNom.innerHTML = nom;
        celluleNom.id = "shop" + i + "Nom" ;

        let celluleDistance = ligne.insertCell();
        celluleDistance.innerHTML = distance;
        celluleDistance.id = "shop" + i + "Distance" ;

        let celluleRemove = ligne.insertCell();
        celluleRemove.innerHTML = '<button id=' + shop._id + ' onclick="supprimerShop(event);">Supprimer</button>';

        let celluleModifier = ligne.insertCell();
        celluleModifier.innerHTML = '<button id=' + shop._id + ' onclick="modifierShop(event,' + i + ');">Modifier</button>';

    }

    let divTable = document.querySelector("#reponseGET");
    divTable.innerHTML = "";

    // on ajoute le tableau au div
    divTable.appendChild(table);
}

function supprimerShop(event) {
    var id = event.target.id;
    console.log("on supprime le shop id = " + id);

    envoieRequeteFetchDelete(id)

    // On affiche le tableau à jour
    getRequest1();
}

function modifierShop(event, noLigne) {
    let id = event.target.id;

    let nom = document.querySelector("#shop" + noLigne + "Nom").textContent;
    let distance = document.querySelector("#shop" + noLigne + "Distance").textContent;

    console.log("modifier shop id = " + id + "avec nom = "+nom + " distance = "+ distance);

    // On remplit le formulaire
    let form = document.querySelector("#formulaireModification");
    form.name.value = nom;
    form.distance.value = distance;
    form._id.value = id;
}
