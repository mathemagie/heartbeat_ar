var five = require("johnny-five"),
    express = require("express"),
    app = express(),
    fs = require("fs"),
    path = require("path"),
    server = require('http').Server(app);

app.use(express.static('public'));


var sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
  passphrase: 'makery'
};



function notify(socket, value) {
  socket.emit('pulse', value)
}


var board = new five.Board();

board.on("ready", function() {

  board.info('Board', 'ready');

  var sensor = new five.Sensor({
    pin: "A0",
    freq: 10
  });

  var currentSocket;

  sensor.scale([ 0, 100 ]).on("change", function() {
    if (currentSocket) {
      notify(currentSocket, this.scaled);
    }
  });

  io.on('connection', function(socket){

    currentSocket = socket;

    board.info('socket.io', 'connection');

  });


});


var http = require('http').createServer(app).listen(8082, function() {
    console.log('listening on http://127.0.0.1:8082');
});

var https = require('https').createServer(sslOptions, app).listen(8443, function() {
    console.log('listening on https://127.0.0.1:8443');
});

var io = require('socket.io')(https);
