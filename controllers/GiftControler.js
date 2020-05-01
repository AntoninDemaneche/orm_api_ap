var data = [{item: 'giff1'}, {item:'gif2'}, {item: 'giff3'}];


module.exports = function(app){

app.get('/gift', function(req, res){
    res.render('gift', {gifts: data});
});

app.post('/gift', function(req, res){

});

app.delete('/gift', function(req, res){

});

};