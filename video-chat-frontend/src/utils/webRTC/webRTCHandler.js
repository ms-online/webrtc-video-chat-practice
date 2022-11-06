import store from '../../store/store';
import {
  setLocalStream,
  setCallState,
  setCallingDialogVisible,
  setCallerUsername,
  callStates,
} from '../../store/actions/callActions';
import * as wss from '../wssConnection/wssConnection';
//默认定义
const defaultConstrains = {
  video: true,
  audio: true,
};
//获取通过socket连接的用户的socketId，让服务器知道谁在和谁通信
let connectUserSocketId;

//获取用户的本地媒体流并保存到store中
export const getLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstrains)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      store.dispatch(setCallState(callStates.CALL_AVAILABLE));
    })
    .catch((error) => {
      console.log('尝试获取访问权限以获取本地媒体流时出错');
      console.log(error);
    });
};

//呼叫某个用户，获取应答者信息
export const callToOtherUser = (calleeDetails) => {
  connectUserSocketId = calleeDetails.socketId;
  //更新呼叫状态：呼叫进行中
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
  //显示呼叫对话框为可见状态
  store.dispatch(setCallingDialogVisible(true));

  wss.sendPreOffer({
    callee: calleeDetails,
    caller: {
      username: store.getState().dashboard.username,
    },
  });
};

//处理从服务器返回的呼叫者的数据，并存储它的sockeId以及callerUsername
export const handlePreOffer = (data) => {
  connectUserSocketId = data.callerSocketId;
  //更新store中的callerUsername
  store.dispatch(setCallerUsername(data.callerUsername));
  //更新store中callState为：requested
  store.dispatch(setCallState(callStates.CALL_REQUESTED));
};
