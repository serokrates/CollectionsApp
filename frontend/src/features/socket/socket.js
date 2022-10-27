import socketIO from "socket.io-client";
const port = process.env.PORT || 5000;
// lokalnie
// export const socket = socketIO.connect(`http://localhost:${port}`);
// heroku
export const socket = socketIO.connect(`http://localhost:${process.env.PORT}`);
