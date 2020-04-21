
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

console.log('express:', express);
console.log('app:', app);

app.get('/hello', function(req,res){
  res.render('hello', {name:req.query.nameQuery});
});

app.get('/hello/:nameParam', function(req,res){
  res.render('hello', {name:req.params.nameParam});
});

var port = process.env.PORT || 3000; // 1
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});