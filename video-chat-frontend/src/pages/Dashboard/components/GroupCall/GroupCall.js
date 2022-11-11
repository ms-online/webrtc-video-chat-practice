import React from 'react';
import { connect } from 'react-redux';
import { callStates } from '../../../../store/actions/callActions';
import GroupCallButton from '../GroupCallButton/GroupCallButton';
import * as webRTCGroupCallHandler from '../../../../utils/webRTC/webRTCGroupCallHandler';
const GroupCall = ({ callState, localStream }) => {
  const createRoom = () => {
    //创建房间
    webRTCGroupCallHandler.createNewGroupCall();
  };
  return (
    <>
      {localStream && callState !== callStates.CALL_IN_PROGRESS && (
        <GroupCallButton onClickHandler={createRoom} label='创建房间' />
      )}
    </>
  );
};

const mapStateTopProps = ({ call }) => ({
  ...call,
});

export default connect(mapStateTopProps)(GroupCall);
