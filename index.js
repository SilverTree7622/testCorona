
// import html element list from crawling.js
let htmlList = require('./crawling.js');

var express = require('express');
var app = express();
var cors = require('cors');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// allow 'CORS-ORIGIN' to the only specific list
var whiteList = [
	'https://www.mohw.go.kr/react/popup_200128.html',
	'https://www.mohw.go.kr/react/popup_200128_3.html',
	'https://www.mohw.go.kr/react/popup_200128_4.html'
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
	// allowedHeaders: ["Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"]
};

// app.options('*', cors(corsOption)) // include before other routes


// app.use(cors(corsOption));
app.use(express.static('client'));

// set client relative path for the full service
app.get('/', (req, res) => {
	console.log('get function in server');
	// __dirname => auto generated var (relative path)
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	console.log('a user connected in server io!');
	
	// 처음 클라이언트에 방출할 때 필요한 작업 (JSON 형식으로)
	socket.emit('initConnection', {serverData: '서버 작동'});

	// send requested HTML list
	socket.on('list', () => {
		socket.emit('listData', htmlList());
	});

	// when disconnect with server
	socket.on('disconnect', () => {
		console.log('a user disconnected');
	});
});

http.listen(port, () => {
	console.log('__dirname:', __dirname);
	console.log('Example app listening at http://localhost:' + port);
});
