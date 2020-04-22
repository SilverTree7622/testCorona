
var express = require('express');
var app = express();
var port = process.env.PORT || 3000; // 1

app.use(express.static('client'));
app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/js/main.js');
  // res.sendFile(__dirname + '/css/main.css');
  // res.sendFile(__dirname + '/favicon.ico');
  res.sendFile(__dirname + '/index.html');
});
app.listen(port, () => {
  console.log('__dirname:', __dirname);
  console.log('Example app listening at http://localhost:' + port)
});

