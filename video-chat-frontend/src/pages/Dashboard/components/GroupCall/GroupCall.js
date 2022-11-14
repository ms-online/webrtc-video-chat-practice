import React from 'react';
import { connect } from 'react-redux';
import {
  callStates,
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled,
} from '../../../../store/actions/callActions';
import GroupCallButton from '../GroupCallButton/GroupCallButton';
import * as webRTCGroupCallHandler from '../../../../utils/webRTC/webRTCGroupCallHandler';
import GroupCallRoom from '../GroupCallRoom/GroupCallRoom';
const GroupCall = (props) => {
  const { callState, localStream, groupCallActive } = props;
  const createRoom = () => {
    //创建房间
    webRTCGroupCallHandler.createNewGroupCall();
  };
  const LeaveRoom = () => {
    //离开房间
    webRTCGroupCallHandler.leaveGroupCall();
  };
  return (
    <>
      {localStream && callState !== callStates.CALL_IN_PROGRESS && (
        <GroupCallButton onClickHandler={createRoom} label='创建房间' />
      )}
      {groupCallActive && <GroupCallRoom {...props} />}
      {groupCallActive && (
        <GroupCallButton onClickHandler={LeaveRoom} label='离开房间' />
      )}
    </>
  );
};

const mapStateTopProps = ({ call }) => ({
  ...call,
});

const mapActionToProps = (dispatch) => {
  return {
    setCameraEnabled: (enabled) => dispatch(setLocalCameraEnabled(enabled)),
    setMicrophoneEnabled: (enabled) =>
      dispatch(setLocalMicrophoneEnabled(enabled)),
  };
};

export default connect(mapStateTopProps, mapActionToProps)(GroupCall);
