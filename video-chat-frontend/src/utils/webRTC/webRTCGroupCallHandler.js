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

  myPeer.on('call', (call) => {
    call.answer(store.getState().call.localStream);
    call.on('stream', (incomingStream) => {
      console.log('接收到流入的媒体流1');
    });
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

//创建加入群组呼叫的方法
export const joinGroupCall = (hostSocketId, roomId) => {
  const localStream = store.getState().call.localStream;
  wss.userWantsToJoinGroupCall({
    peerId: myPeerId,
    hostSocketId,
    roomId,
    streamId: localStream.id,
  });

  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

//创建连接新加入群组用户的方法
export const connectToNewUser = (data) => {
  const localStream = store.getState().call.localStream;

  const call = myPeer.call(data.peerId, localStream);
  call.on('stream', (incomingStream) => {
    console.log('接收到流入的媒体流2');
  });
};
