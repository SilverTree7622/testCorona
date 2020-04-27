
var express = require('express');
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
	optionsSuccessStatus: 200,
	// origin:	whiteList,
	// methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
	// allowedHeaders: ["Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"]
};

// app.options('*', cors(corsOption)) // include before other routes

app.use([
	cors(corsOption),
	express.static('client')
]);

// set client relative path for the full service
app.get('/', (req, res) => {
	// __dirname => auto generated var (relative path)
	res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
	console.log('__dirname:', __dirname);
	console.log('Example app listening at http://localhost:' + port);
});
