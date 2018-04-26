import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:8000");

function subscribeToChangesOnCanvas(fn) {
  socket.on("updateCanvas", (lastX, lastY, currX, currY) => {
    fn(lastX, lastY, currX, currY, false);
  });
}

function emitChanges(lastX, lastY, currX, currY) {
  socket.emit("updateCanvas", lastX, lastY, currX, currY);
}

export { subscribeToChangesOnCanvas, emitChanges };
