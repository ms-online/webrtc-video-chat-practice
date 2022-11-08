//呼叫设置
export const CALL_SET_LOCAL_STREAM = 'CALL_SET_LOCAL_STREAM';
export const CALL_SET_CALL_STATE = 'CALL_SET_CALL_STATE';
export const CALL_SET_CALLING_DIALOG_VISIBLE =
  'CALL_SET_CALLING_DIALOG_VISIBLE';
export const CALL_SET_CALLER_USERNAME = 'CALL_SET_CALLER_USERNAME';
export const CALL_SET_CALL_REJECTED = 'CALL_SET_CALL_REJECTED';
export const CALL_SET_REMOTE_STREAM = 'CALL_SET_REMOTE_STREAM';

//呼叫状态，便于管理组件：可用，不可用，请求，正在进行中
export const callStates = {
  CALL_UNAVAILABLE: 'CALL_UNAVAILABLE',
  CALL_AVAILABLE: 'CALL_AVAILABLE',
  CALL_REQUESTED: 'CALL_REQUESTED',
  CALL_IN_PROGRESS: 'CALL_IN_PROGRESS',
};

//设置本地媒体流
export const setLocalStream = (localStream) => {
  return {
    type: CALL_SET_LOCAL_STREAM,
    localStream,
  };
};
//设置呼叫状态
export const setCallState = (callState) => {
  return {
    type: CALL_SET_CALL_STATE,
    callState,
  };
};

//设置呼叫对话框的可见状态
export const setCallingDialogVisible = (visible) => {
  return {
    type: CALL_SET_CALLING_DIALOG_VISIBLE,
    visible,
  };
};

//设置呼叫者的用户姓名
export const setCallerUsername = (callerUsername) => {
  return {
    type: CALL_SET_CALLER_USERNAME,
    callerUsername,
  };
};

//设置通信拒绝
export const setCallRejected = (callRejectedDetails) => {
  return {
    type: CALL_SET_CALL_REJECTED,
    callRejected: {
      rejected: callRejectedDetails.rejected,
      reason: callRejectedDetails.reason,
    },
  };
};

//设置远端发送的stream媒体流
export const setRemoteStream = (remoteStream) => {
  return {
    type: CALL_SET_REMOTE_STREAM,
    remoteStream,
  };
};
