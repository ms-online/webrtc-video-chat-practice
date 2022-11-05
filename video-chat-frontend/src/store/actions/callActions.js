//呼叫设置
export const CALL_SET_LOCAL_STREAM = 'CALL_SET_LOCAL_STREAM';
export const CALL_SET_CALL_STATE = 'CALL_SET_CALL_STATE';

//呼叫状态，便于管理组件：可用，不可用，请求，正在进行中
export const callState = {
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
