//引入模块
const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

//服务器初始化
const app = express();
const PORT = process.env.PORT || 5000;

//cors包解决跨越访问问题
app.use(cors);

//监听端口号启动服务器
const server = app.listen(PORT, () => {
  console.log(`服务器正在${PORT}端口号运行...`);
});

//传递server对象，初始化io实例
const io = socket(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

//初始化对等连接用户数组
const peers = [];

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
});
