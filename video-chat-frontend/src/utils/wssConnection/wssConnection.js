import socketClient from 'socket.io-client';
import store from '../../store/store';
import * as dashboardActions from '../../store/actions/dashboardActions';
import * as webRTCHandler from '../webRTC/webRTCHandler';
import * as webRTCGroupCallHandler from '../webRTC/webRTCGroupCallHandler';
//定义广播类型的常量
const broadcastEventTypes = {
  ACTIVE_USERS: 'ACTIVE_USERS',
  GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS',
};
const SERVER = 'http://localhost:5000';

let socket;

export const connectWithSocket = () => {
  socket = socketClient(SERVER);

  socket.on('connection', () => {
    console.log('WebSocket connection success!');
    console.log(socket.id);
  });

  //监听服务器的广播，获取返回的活跃用户数组
  socket.on('broadcast', (data) => {
    //将活跃用户数组数据保存到store中
    handleBroadcastEvents(data);
  });

  //应答方监听从服务器返回的呼叫者传递的data数据
  socket.on('pre-offer', (data) => {
    webRTCHandler.handlePreOffer(data);
  });

  //呼叫方监听服务器返回的应答方回复的data数据
  socket.on('pre-offer-answer', (data) => {
    webRTCHandler.handlePreOfferAnswer(data);
  });

  //应答方监听从服务器返回的呼叫方传递的SDP
  socket.on('webRTC-offer', (data) => {
    webRTCHandler.handleOffer(data);
  });

  //呼叫方监听从服务器返回的应答方传递的SDP
  socket.on('webRTC-answer', (data) => {
    webRTCHandler.handleAnswer(data);
  });

  //监听传递的ICE
  socket.on('webRTC-candidate', (data) => {
    webRTCHandler.handleCandidate(data);
  });

  //监听服务器传递的挂断通知
  socket.on('user-hanged-up', () => {
    webRTCHandler.handleUserHangedUp();
  });

  //监听群组呼叫相关内容
  socket.on('group-call-join-request', (data) => {
    webRTCGroupCallHandler.connectToNewUser(data);
  });
};

/////////////////////////////////////发送和直接呼叫相关的事件///////////////////////////////////

//注册新用户
export const registerNewUser = (username) => {
  socket.emit('register-new-user', {
    username,
    socketId: socket.id,
  });
};

//派发action行为，修改store状态
const handleBroadcastEvents = (data) => {
  switch (data.event) {
    case broadcastEventTypes.ACTIVE_USERS:
      // 过滤客户端本身的信息
      const activeUsers = data.activeUsers.filter(
        (activeUser) => activeUser.socketId !== socket.id
      );
      // 派发action，保存活跃用户
      store.dispatch(dashboardActions.setActiveUsers(activeUsers));
    case broadcastEventTypes.GROUP_CALL_ROOMS:
      store.dispatch(dashboardActions.setGroupCalls(data.groupCallRooms));
      break;
    default:
      break;
  }
};

//向服务器发送预呼叫数据
export const sendPreOffer = (data) => {
  socket.emit('pre-offer', data);
};

//应答方向服务器发送预呼叫处理的回复
export const sendPreOfferAnswer = (data) => {
  socket.emit('pre-offer-answer', data);
};

//Offer发送SDP到信令服务器
export const sendWebRTCOffer = (data) => {
  socket.emit('webRTC-offer', data);
};

//Answer发送SDP到信令服务器
export const sendWebRTCAnswer = (data) => {
  socket.emit('webRTC-answer', data);
};

//发送ICE候选人信息
export const sendWebRTCCandidate = (data) => {
  socket.emit('webRTC-candidate', data);
};

//发送挂断通知
export const sendUserHangedUp = (data) => {
  socket.emit('user-hanged-up', data);
};

///////////////////////////////////发送和群组呼叫相关的事件///////////////////////////////////

export const registerGroupCall = (data) => {
  socket.emit('group-call-register', data);
};

export const userWantsToJoinGroupCall = (data) => {
  socket.emit('group-call-join-request', data);
};
