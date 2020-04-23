
var express = require('express');
var app = express();
var cors = require('cors');
var port = process.env.PORT || 3000;

// allow 'CORS-ORIGIN' the only specific list
var whiteList = [
	'https://www.mohw.go.kr/react/popup_200128.html',
	'https://www.mohw.go.kr/react/popup_200128_3.html',
	'https://www.mohw.go.kr/react/popup_200128_4.html'
];
var corsOption = {
	// origin: function (_origin, _callback) {
	// 	if (whiteList.indexOf(_origin) !== -1) {
	// 		_callback(null, true)
	// 	} else {
	// 		_callback(new Error('Not allowed by CORS'))
	// 	}
	// }
	origin:	whiteList,
	default: 'https://www.mohw.go.kr/react/popup_200128.html'
};

// app.all('*', function (req, res, next) {
// 	var origin = corsOption.origin.indexOf(req.header('host').toLowerCase()) > -1 ? req.headers.origin : corsOption.default;
// 	res.header("Access-Control-Allow-Origin", origin);
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	next();
// });

// app.get('/products/:id', cors(corsOption), function (req, res, next) {
// 	res.json({msg: 'This is CORS-enabled for a Single Route'})
// });


// app.all('/*', function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
// 	next();
// });

app.use(express.static('client'));

app.use(function (req, res, next) {
	for (var i=0; i<whiteList.length; i++) {
		res.header("Access-Control-Allow-Origin", whiteList[i]);
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
		if (i === whiteList.length - 1) {
			next();
		}
	}
});

app.get('/', (req, res) => {
	// __dirname => auto generated var (relative path)
	res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
	console.log('__dirname:', __dirname);
	console.log('Example app listening at http://localhost:' + port)
});

