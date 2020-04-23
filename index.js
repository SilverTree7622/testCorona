
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
	origin: function (_origin, _callback) {
		var tmpBool = whiteList.indexOf(_origin) !== -1;
		_callback(null, tmpBool);
		// if (whiteList.indexOf(_origin) !== -1) {
		// 	_callback(null, true);
		// } else {
		// 	_callback(new Error('Not allowed by CORS'));
		// }
	},	
	credentials: true
	// origin:	whiteList,
};

app.use([
	cors(corsOption),
	express.static('client')	
]);

// app.get('/', cors(corsOption), function (req, res, next) {
// 	res.json({msg: 'This is CORS-enabled for a Single Route'})
// });

// set client relative path for the full service
app.get('/', (req, res) => {
	// __dirname => auto generated var (relative path)
	res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
	console.log('__dirname:', __dirname);
	console.log('Example app listening at http://localhost:' + port)
});

