var express = require('express');
var giftController = require ('./controllers/GiftControler.js')


var app = express();

//Mise en place du template
app.set('view engine', 'ejs');

//Fichier static

app.use('/assets', express.static('./public'))


giftController(app);

app.listen(3000,function(){
    console.log("Le serveur est lancer sur le port 3000 : http://localhost:3000/");
 });