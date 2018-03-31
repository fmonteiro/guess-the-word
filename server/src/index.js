const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 8000;

io.on("connection", client => {
  client.on("subscribeToTimer", interval => {
    console.log("client is subscribing to timer with interval ", interval);
    setInterval(() => {
      client.emit("timer", new Date());
    }, interval);
  });
});

io.listen(port);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

server.listen(4000, () => {
  console.log("running...");
});
