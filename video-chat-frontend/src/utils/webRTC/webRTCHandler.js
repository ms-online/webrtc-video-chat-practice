import store from '../../store/store';
import {
  setLocalStream,
  setCallState,
  setCallingDialogVisible,
  setCallerUsername,
  callStates,
} from '../../store/actions/callActions';
import * as wss from '../wssConnection/wssConnection';

//定义预呼叫回复状态
const preOfferAnswers = {
  CALL_ACCEPTED: 'CALL_ACCEPTED',
  CALL_REJECTED: 'CALL_REJECTED',
  //客观因素影响无法通信（对方正在通话中）
  CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABLE',
};

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
  //判断是否不受客观通信因素影响

  if (checkIfCallPossible) {
    connectUserSocketId = data.callerSocketId;
    //更新store中的callerUsername
    store.dispatch(setCallerUsername(data.callerUsername));
    //更新store中callState为：requested
    store.dispatch(setCallState(callStates.CALL_REQUESTED));
  } else {
    //受客观因素影响的情况下，通过服务器向发起方传达回复
    wss.sendPreOfferAnswer({
      callerSocketId: data.callerSocketId,
      answer: preOfferAnswers.CALL_NOT_AVAILABLE,
    });
  }
};

//创建验证通信可能的函数
export const checkIfCallPossible = () => {
  if (
    store.getState().call.localStream === null ||
    store.getState().call.callState !== callStates.CALL_AVAILABLE
  ) {
    //客观因素影响无法通信
    return false;
  } else {
    return true;
  }
};

//创建处理handlePreOfferAnswer的函数
export const handlePreOfferAnswer = (data) => {
  //验证answer结果，如果为CALL_ACCEPTED
  if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
    // 进入到webRTC逻辑
  } else {
    let rejectedReason;
    if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
      rejectedReason = '应答方现在无法接听电话';
    } else {
      rejectedReason = '应答方拒绝你的呼叫';
    }
  }

  //dispatch 拒绝接听的action，后面完成
};
