const express  = require('express');
const app      = express();
const port     = process.env.PORT || 8886;
const server   = require('http').Server(app);

const mongoDBModule = require('./app_modules/crud-mongo');

// Pour les formulaires standards
const bodyParser = require('body-parser');
// pour les formulaires multiparts
var multer = require('multer');
var multerData = multer();

// Cette ligne indique le répertoire qui contient
// les fichiers statiques: html, css, js, images etc.
app.use(express.static(__dirname + '/public'));
// Paramètres standards du module bodyParser
// qui sert à récupérer des paramètres reçus
// par ex, par l'envoi d'un formulaire "standard"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");

    next();
});

// Lance le serveur avec express
server.listen(port);
console.log("Serveur lancé sur le port : " + port);

//------------------
// ROUTES
//------------------
// Indique la page principale
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Test de la connexion à la base
app.get('/api/connection', function(req, res) {
	// 
   mongoDBModule.connexionMongo(function(err, db) {
   	let reponse;

   	if(err) {
   		console.log("erreur connexion");
   		reponse = {
   			msg: "erreur de connexion err=" + err
   		}
   	} else {
   		reponse = {
   			msg: "connexion établie"
   		}
   	}
   	res.send(JSON.stringify(reponse));

   });
});

// On va récupérer les shops par un GET
app.get('/api/shops', function(req, res) { 
	/* Si présent on prend la valeur du param, sinon 1
    let page = parseInt(req.query.page || 1);
    // idem si present on prend la valeur, sinon 10
    let pagesize = parseInt(req.query.pagesize || 10);

	let name = req.query.name || '';
	*/

 	mongoDBModule.findShops(function(data, count) {
 		var objdData = {
 			msg: "shops recherchés avec succès",
 			data: data,
			count: count
 		}
 		res.send(JSON.stringify(objdData)); 
 	}); 
});

// Creation d'un shop par envoi d'un formulaire
app.post('/api/shops', multerData.fields([]), function(req, res) {
	// On supposera qu'on ajoutera un shop en 
	// donnant son nom et sa distance. On va donc 
	// recuperer les données du formulaire d'envoi
	// 

 	mongoDBModule.createShop(req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

// Modification d'un restaurant, 
// on fera l'update par une requête http PUT
app.put('/api/shops/:id', multerData.fields([]), function(req, res) {
	var id = req.params.id;

 	mongoDBModule.updateShop(id, req.body, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
});

// Suppression d'un restaurant
// On fera la suppression par une requête http DELETE
// c'est le standard REST
app.delete('/api/shops/:id', function(req, res) {
	var id = req.params.id;

 	mongoDBModule.deleteShop(id, function(data) {
 		res.send(JSON.stringify(data)); 
 	});
})
