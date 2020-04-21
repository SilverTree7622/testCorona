
var express = require('express');
var app = express();
var http = require('http');
var port = process.env.PORT || 3000; // 1
var server = http.createServer(app);
// var io = require('socket.io')(server, { origins: '*:*' });


// server.listen(port);
// server.on('listening', () => {
//     console.log('port:', port);
// });

// app.get('/', function(req, res) {
//     console.log('app get function');
//     res.sendFile(__dirname + '/index.html');
// });


app.use('/', express.static(__dirname + '/index.html'));
app.listen('port', () => {
  console.log('app listen function');
});

// // connection event handler
// // connection이 수립되면 event handler function의 인자로 socket인 들어온다
// io.on('connection', function(socket) {
//     console.log('io connection function');

//     // 접속한 클라이언트의 정보가 수신되면
//     socket.on('login', function(data) {
//       console.log('Client logged-in:\n name:' + data.name + '\n userid: ' + data.userid);
  
//       // socket에 클라이언트 정보를 저장한다
//       socket.name = data.name;
//       socket.userid = data.userid;
  
//       // 접속된 모든 클라이언트에게 메시지를 전송한다
//       io.emit('login', data.name );
//     });
  
//     // 클라이언트로부터의 메시지가 수신되면
//     socket.on('chat', function(data) {
//       console.log('Message from %s: %s', socket.name, data.msg);
  
//       var msg = {
//         from: {
//           name: socket.name,
//           userid: socket.userid
//         },
//         msg: data.msg
//       };
  
//       // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
//       socket.broadcast.emit('chat', msg);
  
//       // 메시지를 전송한 클라이언트에게만 메시지를 전송한다
//       // socket.emit('s2c chat', msg);
  
//       // 접속된 모든 클라이언트에게 메시지를 전송한다
//       // io.emit('s2c chat', msg);
  
//       // 특정 클라이언트에게만 메시지를 전송한다
//       // io.to(id).emit('s2c chat', data);
//     });
  
//     // force client disconnect from server
//     socket.on('forceDisconnect', function() {
//       socket.disconnect();
//     })
  
//     socket.on('disconnect', function() {
//       console.log('user disconnected: ' + socket.name);
//     });
// });
  
// server.listen(port, function() {
//     console.log('Socket IO server listening on port');
// });

// app.use(express.static(__dirname + '/public'));

// console.log('express:', express);
// console.log('app:', app);

// app.get('/hello', function(req,res){
//   res.render('hello', {name:req.query.nameQuery});
// });

// app.get('/hello/:nameParam', function(req,res){
//   res.render('hello', {name:req.params.nameParam});
// });

// app.listen(port, function(){
//   console.log('server on! http://localhost:'+port);
// });