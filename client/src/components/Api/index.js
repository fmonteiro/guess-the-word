import openSocket from "socket.io-client";

let socket;
// http://localhost:8000

function connectToServer(ip) {
    socket = openSocket(ip);

    return true;
}

function subscribeToChangesOnCanvas(fn ,ip) {
  socket.on("updateCanvas", (lastX, lastY, currX, currY) => {
    fn(lastX, lastY, currX, currY, false);
  });
}

function emitChanges(lastX, lastY, currX, currY, ip) {
    socket.emit("updateCanvas", lastX, lastY, currX, currY);
}

export { subscribeToChangesOnCanvas, emitChanges, connectToServer };
