import socketClient from 'socket.io-client';

const SERVER = 'http://localhost:5000';

let socket;

export const connectWithSocket = () => {
  socket = socketClient(SERVER);

  socket.on('connection', () => {
    console.log('WebSocket connection success!');
    console.log(socket.id);
  });
};
