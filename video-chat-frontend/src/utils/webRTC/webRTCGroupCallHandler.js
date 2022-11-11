import * as wss from '../wssConnection/wssConnection';
import store from '../../store/store';

let myPeer;
let myPeerId;
export const connectWithMyPeer = () => {
  myPeer = new window.Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '5000',
  });

  myPeer.on('open', (id) => {
    console.log('成功连接到PeerServer');
    myPeerId = id;
  });
};

//创建新的群组呼叫
export const createNewGroupCall = () => {
  wss.registerGroupCall({
    username: store.getState().dashboard.username,
    peerId: myPeerId,
  });
};
