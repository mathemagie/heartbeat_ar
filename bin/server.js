var five = require("johnny-five"),
  express = require("express"),
  app = express(),
  fs = require("fs"),
  path = require("path"),
  ip = require('ip'),
  server = require("http").Server(app)


// socket.io server (real-time)
var io = new require("socket.io")();

// serve static files : html, js, css
app.use(express.static("public"))

// https
var sslOptions = {
  key: fs.readFileSync(path.join(__dirname, "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
  passphrase: "makery"
}

// serve http
var http = require("http").createServer(app).listen(8082, function() {
  console.log("listening on http://127.0.0.1:8082")
})

// serve https
var https = require("https").createServer(sslOptions, app).listen(8443, function() {
  console.log("listening on https://127.0.0.1:8443")
})

// use http+https for socket.io
io.attach(http)
io.attach(https)

io.on("connection", function(socket) {
  socket.emit("url", `https://${ip.address()}:8443`)
})

// johnny-five board autodetection
var board = new five.Board()

board.on("ready", function() {
  board.info("Board", "ready")

  // declare our sensor
  var sensor = new five.Sensor({
    pin: "A0",
    freq: 10
  })

  // scale 0-1024 values to 0-100
  sensor.scale([0, 100]).on("change", function() {
    io.sockets.emit("pulse", this.scaled)
  })


})

