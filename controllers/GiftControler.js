


var bodyParser = require('body-parser');


var data = [{item: 'giff1'}, {item:'gif2'}, {item: 'giff3'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/gift', function(req, res){
    res.render('gift', {gifts: data});
});

app.post('/gift', urlencodedParser, function(req, res){
    data.push(req.body);
    res.json(data);
});

app.delete('/gift/:item', function(req, res){
    data = data.filter(function(gift){
        return gift.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
});

};