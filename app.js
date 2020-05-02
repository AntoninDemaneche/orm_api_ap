const express = require('express');
const giftController = require ('./controllers/GiftControler.js')
const Sequelize = require('sequelize');


const app = express();


app.set('view engine', 'ejs');



app.use('/assets', express.static('./public'))

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite'
  });

const Playlist = sequelize.define('playlist', {
    id: {
        field: 'PlaylistId',
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name:{
        field: 'Name',
        type : Sequelize.STRING
    }
}, {
    timestamps: false
});

app.get('/api/playlist', function(request, reponse){
   Playlist.findAll().then((playlist) => {
       response.json(playlist);
    });
});


giftController(app);



app.listen(3000,function(){
    console.log("Le serveur est lancer sur le port 3000 : http://localhost:3000/");
 });