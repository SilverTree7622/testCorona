
// import html element list from crawling.js
let htmlList = require('./crawling.js');

var express = require('express');
var app = express();
// var cors = require('cors');
// var https = require('https').createServer(app);
var http = require('http').createServer(app);
// var io = require('socket.io')(https);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// // allow 'CORS-ORIGIN' to the only specific list
// var whiteList = [
// 	'https://www.mohw.go.kr/react/popup_200128.html',
// 	'https://www.mohw.go.kr/react/popup_200128_3.html',
// 	'https://www.mohw.go.kr/react/popup_200128_4.html'
// ];
// var corsOption = {
// 	// origin: function (_origin, _callback) {
// 	// 	var tmpBool = whiteList.indexOf(_origin) !== -1;
// 	// 	_callback(null, tmpBool);
// 	// },
// 	origin:	whiteList,
// 	// origin:	'http://localhost:' + port,
// 	credentials: true,
// 	optionsSuccessStatus: 200,
// 	// methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
// 	// allowedHeaders: ["Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"]
// };

// // app.options('*', cors(corsOption)) // include before other routes


// set client static folder
app.use(express.static('client'));

// redirect http to https logic
app.use((req, res, next) => {
	console.log('redirect system confirm');
    if (req.header('x-forwarded-proto') !== 'https') {
		console.log('REDIRECT SYS: redirect to https');
		res.redirect(`https://${req.header('host')}${req.url}`);
	}
    else {
		console.log('REDIRECT SYS: it s already https keep going!');
		next();
	} 
});

// set client relative path for the full service (send static {html, css, js} file)
app.get('/', (req, res) => {
	// __dirname => auto generated var (relative path)
	res.sendFile(__dirname + '/index.html');

	// add marker images
	// center
	res.sendFile(__dirname + '/assets/markers/center_marker.png');
	// hospital
	res.sendFile(__dirname + '/assets/markers/hospital_marker.png');
	// mask
	res.sendFile(__dirname + '/assets/markers/mask_marker_green.png');
	res.sendFile(__dirname + '/assets/markers/mask_marker_red.png');
	res.sendFile(__dirname + '/assets/markers/mask_marker_yellow.png');
	// car drive
	res.sendFile(__dirname + '/assets/markers/car_marker.png');
});

// socket io connection event (send this to client)
io.on('connection', (socket) => {
	
	// init emit to client (in JSON format)
	socket.emit('initConnection', {serverData: '서버 작동'});

	// send requested HTML list (hospital, center, drive info)
	socket.on('list', () => {
		// sending only once
		console.log('socket: server => client the html data list');
		socket.emit('listData', htmlList());
	});

	// when disconnect with server
	socket.on('disconnect', () => {
		console.log('socket: a user disconnected');
	});
});

// http server (made by app)
http.listen(port, () => {
	console.log('__dirname:', __dirname); // relative direct path
	console.log('Example app listening at http://localhost:' + port);
});
