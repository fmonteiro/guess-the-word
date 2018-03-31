const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 8000;

io.on("connection", client => {
  console.log("Client connected...");
  
  client.on("updateCanvas", (lastX, lastY, currX, currY) => {
    io.sockets.emit("updateCanvas", lastX, lastY, currX, currY);
  });
});

io.listen(port);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

server.listen(4000, () => {
  console.log("running...");
});
