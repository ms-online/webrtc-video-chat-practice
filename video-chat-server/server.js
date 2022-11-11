//引入模块
const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { ExpressPeerServer } = require('peer');
const groupCallHandler = require('./groupCallHandler');
//服务器初始化
const app = express();
const PORT = process.env.PORT || 5000;

//cors包解决跨越访问问题
app.use(cors());

//监听端口号启动服务器
const server = app.listen(PORT, () => {
  console.log(`服务器正在${PORT}端口号运行...`);
});

//使用ExpressPeerServer对象来创建peer服务器
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

//使用app.use设置中间件
app.use('/peerjs', peerServer);

//监听端口号启动Peer服务器
groupCallHandler.createPeerServerListeners(peerServer);

//传递server对象，初始化io实例
const io = socket(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

//初始化对等连接用户数组
let peers = [];

//定义广播类型的常量
const broadcastEventTypes = {
  ACTIVE_USERS: 'ACTIVE_USERS',
  GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS',
};

//监听客户端socket连接
io.on('connection', (socket) => {
  socket.emit('connection', null);
  console.log('新用户加入房间');
  console.log(socket.id);

  //服务器保存注册的新用户数据
  socket.on('register-new-user', (data) => {
    peers.push({
      username: data.username,
      socketId: data.socketId,
    });
    console.log('注册新用户');
    console.log(peers);

    //向所有连接到客户端用户广播，并发送活跃用户列表
    io.sockets.emit('broadcast', {
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers: peers,
    });
  });

  //断开连接时移除存储在服务器的用户并向其他客户端进行广播
  socket.on('disconnect', () => {
    console.log('有用户下线了');
    peers = peers.filter((peer) => peer.socketId !== socket.id);
    io.sockets.emit('broadcast', {
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers: peers,
    });
  });

  //监听客户端发送过来的预呼叫并获取data，传递给应答方
  socket.on('pre-offer', (data) => {
    console.log('处理预呼叫');
    //向应答方发送data数据
    io.to(data.callee.socketId).emit('pre-offer', {
      callerUsername: data.caller.username,
      callerSocketId: socket.id,
    });
  });

  //监听应答方从客户端发送过来的预呼叫回复并获取data,传递给呼叫方
  socket.on('pre-offer-answer', (data) => {
    console.log('处理预呼叫回复');
    //向呼叫方发送回复的data数据
    io.to(data.callerSocketId).emit('pre-offer-answer', {
      answer: data.answer,
    });
  });

  //监听呼叫方从客户端发送过来的Offer SDP并传递给应答方
  socket.on('webRTC-offer', (data) => {
    console.log('处理webRTC Offer');
    io.to(data.calleeSocketId).emit('webRTC-offer', {
      offer: data.offer,
    });
  });

  //监听应答方从客户端发送过来的Answer SDP并传递给呼叫方
  socket.on('webRTC-answer', (data) => {
    console.log('处理webRTC answer');
    io.to(data.callerSocketId).emit('webRTC-answer', {
      answer: data.answer,
    });
  });

  //监听传递的ICE
  socket.on('webRTC-candidate', (data) => {
    console.log('处理webRTC-candidate');
    io.to(data.connectUserSocketId).emit('webRTC-candidate', {
      candidate: data.candidate,
    });
  });

  //监听挂断的通知
  socket.on('user-hanged-up', (data) => {
    io.to(data.connectUserSocketId).emit('user-hanged-up');
  });
});
