const sqlite3 = require('sqlite3')
const db_name = 'chinook.sqlite'

//Connexion à la base de donnée
let db = new sqlite3.Database(db_name, err => {
    if(err)
        throw err
    console.log('La bdd se lance sur '+db_name)

    //db.run(`CREATE TABLE playlist(id INTERGER PRIMARYKEY,name VARCHAR(255) )`)
    //db.run(`INSERT INTO playlist(name) VALUES("Test3")`)
    console.log('Les commandes ce sont executer')
})
