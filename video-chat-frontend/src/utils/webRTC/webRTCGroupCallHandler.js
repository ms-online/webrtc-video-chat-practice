let myPeer;

export const connectWithMyPeer = () => {
  myPeer = new window.Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '5000',
  });

  myPeer.on('open', (id) => {
    console.log('成功连接到PeerServer');
    console.log(id);
  });
};
