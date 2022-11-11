const createPeerServerListeners = (peerServer) => {
  peerServer.on('connection', (client) => {
    console.log('成功连接到PeerJS服务器');
    console.log(client.id);
  });
};

module.exports = {
  createPeerServerListeners,
};
