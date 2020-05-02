const express = require('express');
const giftController = require ('./controllers/GiftControler.js')
const Sequelize = require('sequelize');


const app = express();


app.set('view engine', 'ejs');



app.use('/assets', express.static('./public'))

//Connexion à la base de donnée
const sqlite3 = require('sqlite3')
const db_name = 'chinook.sqlite'

let db = new sqlite3.Database(db_name, err => {
    if(err)
        throw err
    console.log('La bdd se lance sur '+db_name)
})



giftController(app);



app.listen(3000,function(){
    console.log("Le serveur est lancé sur le port 3000 : http://localhost:3000/");
 });