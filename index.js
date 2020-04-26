
var express = require('express');
var http = require('http');
var app = express();
var cors = require('cors');
var port = process.env.PORT || 3000;
// var server = http.createServer(app);

// allow 'CORS-ORIGIN' to the only specific list
var whiteList = [
	'https://www.mohw.go.kr/react/popup_200128.html',
	'https://www.mohw.go.kr/react/popup_200128_3.html',
	'https://www.mohw.go.kr/react/popup_200128_4.html'
];
var corsOption = {
	origin: function (_origin, _callback) {
		var tmpBool = whiteList.indexOf(_origin) !== -1;
		_callback(null, tmpBool);
	},
	credentials: true,
	optionsSuccessStatus: 200
	// origin:	whiteList,
};

app.options('*', cors(corsOption)) // include before other routes

app.use([
	// cors(corsOption),
	express.static('client')
]);

// set client relative path for the full service
app.get('/', (req, res) => {
	// __dirname => auto generated var (relative path)
	res.sendFile(__dirname + '/public' +'/index.html');
});

app.listen(port, () => {
	console.log('__dirname:', __dirname);
	console.log('Example app listening at http://localhost:' + port);
});

// try {
// 	var corsOption = {
// 		origin: function (_origin, _callback) {
// 			var tmpBool = whiteList.indexOf(_origin) !== -1;
// 			_callback(null, tmpBool);
// 		},
// 		credentials: true,
// 		optionsSuccessStatus: 200
// 		// origin:	whiteList,
// 	};
// 	console.log('try function SUCCESS');
// } catch(e) {}

// app.all('/*', function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
// 	next();
// });

// app.get('/', cors(corsOption), function (req, res, next) {
// 	res.json({msg: 'This is CORS-enabled for a Single Route'});
// 	next();
// });

// app.options('*', cors(corsOption));

// app.use([
// 	// cors(corsOption),
// 	express.static('client')
// ]);

// app.use(function (req, res, next) {
// 	res.header("Access-Control-Allow-Origin", '*');
// 	res.header('Access-Control-Allow-Methods', 'GET');
// 	res.header('Access-Control-Allow-Headers', '*');
// 	res.status(304);
// 	// some browsers send a pre-flight OPTIONS request to check if CORS is enabled so you have to also respond to that
// 	if ('OPTIONS' === req.method) {
// 		res.send(304);
// 	}
// 	else {
// 		next();
// 	}
// });

// app.listen(port, () => {
// 	console.log('__dirname:', __dirname);
// 	console.log('Example app listening at http://localhost:' + port);
// });
