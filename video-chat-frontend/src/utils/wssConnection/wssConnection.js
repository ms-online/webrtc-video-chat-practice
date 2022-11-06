import socketClient from 'socket.io-client';
import store from '../../store/store';
import * as dashboardActions from '../../store/actions/dashboardActions';
import * as webRTCHandler from '../webRTC/webRTCHandler';
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
};

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
      break;
    default:
      break;
  }
};

//向服务器发送预呼叫数据
export const sendPreOffer = (data) => {
  socket.emit('pre-offer', data);
};
