import * as wss from '../wssConnection/wssConnection';
import store from '../../store/store';
import {
  setGroupCallActive,
  setCallState,
  callStates,
} from '../../store/actions/callActions';
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

  //更新groupCallActive状态，确保他人无法呼叫自己
  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};
