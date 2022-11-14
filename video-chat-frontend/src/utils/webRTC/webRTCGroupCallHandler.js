import * as wss from '../wssConnection/wssConnection';
import store from '../../store/store';
import {
  setGroupCallActive,
  setCallState,
  callStates,
  setGroupCallIncomingStreams,
  clearGroupCallData,
} from '../../store/actions/callActions';

let myPeer;
let myPeerId;
let groupCallRoomId;
let groupCallHost = false;

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
      const streams = store.getState().call.groupCallStreams;
      const stream = streams.find((stream) => stream.id === incomingStream.id);

      if (!stream) {
        addVideoStream(incomingStream);
      }
    });
  });
};

//创建新的群组呼叫
export const createNewGroupCall = () => {
  groupCallHost = true;
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
  groupCallRoomId = roomId;
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
    const streams = store.getState().call.groupCallStreams;
    const stream = streams.find((stream) => stream.id === incomingStream.id);

    if (!stream) {
      addVideoStream(incomingStream);
    }
  });
};

//添加传入流到群组呼叫流数组中
const addVideoStream = (incomingStream) => {
  const groupCallStreams = [
    ...store.getState().call.groupCallStreams,
    incomingStream,
  ];

  store.dispatch(setGroupCallIncomingStreams(groupCallStreams));
};

//离开群组呼叫房间
export const leaveGroupCall = () => {
  if (groupCallHost) {
    //作为房主离开时需要向服务器告知关闭他所创建的房间
    wss.groupCallCloseByHost({
      peerId: myPeerId,
    });
  } else {
    wss.userLeftGroupCall({
      roomId: groupCallRoomId,
      streamId: store.getState().call.localStream.id,
    });
  }

  //状态重置
  clearGroupData();
};
export const clearGroupData = () => {
  groupCallRoomId = null;
  groupCallHost = null;
  store.dispatch(clearGroupCallData());
  console.log(1);
  //销毁流并且关闭连接
  myPeer.destroy();
  connectWithMyPeer();

  const localStream = store.getState().call.localStream;
  localStream.getVideoTracks()[0].enabled = true;
  localStream.getAudioTracks()[0].enabled = true;
};

//移除离开房间的用户的stream流
export const removeInactiveStream = (data) => {
  const groupCallStreams = store
    .getState()
    .call.groupCallStreams.filter((stream) => stream.id !== data.streamId);

  store.dispatch(setGroupCallIncomingStreams(groupCallStreams));
};

//验证当前用户是否加入了群组呼叫，如果加入则返回该房间的rooId
export const checkActiveGroupCall = () => {
  if (store.getState().call.groupCallActive) {
    return groupCallRoomId;
  } else {
    return false;
  }
};
