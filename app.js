const express = require('express');
const giftController = require ('./controllers/GiftControler.js')
const Sequelize = require('sequelize');


const app = express();


app.set('view engine', 'ejs');



app.use('/assets', express.static('./public'))


giftController(app);

//const Playlist = sequelize.define('playlist', {
//    id: {
//        field: 'PlaylistId',
//        type: Sequelize.INTEGER,
//        primaryKey: true
//    },
//    name:{
//        field: 'Name',
//        type : Sequelize.STRING
//    }
//}, {
//    timestamps: false
//});
//
//app.get('/api/playlist', function(request, reponse){
//   Playlist.findAll().then((playlist) => {
//       response.json(playlist);
//    });
//});


app.listen(3000,function(){
    console.log("Le serveur est lancé sur le port 3000 : http://localhost:3000/");
 });