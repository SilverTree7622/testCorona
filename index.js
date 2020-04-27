
var express = require('express');
var app = express();
var cors = require('cors');
var port = process.env.PORT || 3000;
// var server = http.createServer(app);

// allow 'CORS-ORIGIN' to the only specific list
var whiteList = [
	'https://www.mohw.go.kr/react/popup_200128.html',
	'https://www.mohw.go.kr/react/popup_200128_3.html',
	'https://www.mohw.go.kr/react/popup_200128_4.html',
	'https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json'
];
var corsOption = {
	// origin: function (_origin, _callback) {
	// 	var tmpBool = whiteList.indexOf(_origin) !== -1;
	// 	_callback(null, tmpBool);
	// },
	origin:	whiteList,
	// origin:	'http://localhost:' + port,
	credentials: true,
	optionsSuccessStatus: 200,
	// methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
	allowedHeaders: ["Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"]
};

// app.options('*', cors(corsOption)) // include before other routes


app.use(cors(corsOption));
app.use(express.static('client'));

// set client relative path for the full service
app.get('/', (req, res) => {
	// __dirname => auto generated var (relative path)
	res.sendFile(__dirname + '/index.html');
});

var server = app.listen(port, () => {
	console.log('__dirname:', __dirname);
	console.log('Example app listening at http://localhost:' + port);
});

console.log('server:', server);