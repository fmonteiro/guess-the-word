const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 8000;

io.on("connection", socket => {
  console.log("Client connected...", socket.id);
  
  socket.on("updateCanvas", (lastX, lastY, currX, currY) => {
    io.sockets.emit("updateCanvas", lastX, lastY, currX, currY);
    //socket.broadcast.emit("updateCanvas", lastX, lastY, currX, currY);
  });

  socket.on("updateChat", message => {
    //io.sockets.emit("updateChat", message);
    socket.broadcast.emit("updateChat", message);
  });

});

io.listen(port);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

server.listen(4000, () => {
  console.log("running...");
});
