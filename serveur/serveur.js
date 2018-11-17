const express  = require('express');
const app      = express();
const port     = process.env.PORT || 8886;
const server   = require('http').Server(app);

const mongoDBModule = require('./app_modules/crud-mongo');

// Cette ligne indique le répertoire qui contient
// les fichiers statiques: html, css, js, images etc.
app.use(express.static(__dirname + '/public'));

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