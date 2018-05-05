import openSocket from "socket.io-client";

let socket;
// http://localhost:8000

export function connectToServer(ip) {
  socket = openSocket(ip);
  return true;
}

export function subscribeToChangesOnCanvas(fn, ip) {
  socket.on("updateCanvas", (lastX, lastY, currX, currY) => {
    fn(lastX, lastY, currX, currY, false);
  });
}

export function subscribeToChangesOnChat(fn) {
  socket.on("updateChat", message => {
    fn(message, false);
  });
}

export function emitChangesOnChat(message) {
  socket.emit("updateChat", message);
}

export function emitChanges(lastX, lastY, currX, currY, ip) {
  socket.emit("updateCanvas", lastX, lastY, currX, currY);
}