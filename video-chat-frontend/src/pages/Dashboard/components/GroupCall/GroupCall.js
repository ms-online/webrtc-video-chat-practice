import React from 'react';
import { connect } from 'react-redux';
import { callStates } from '../../../../store/actions/callActions';
import GroupCallButton from '../GroupCallButton/GroupCallButton';
import * as webRTCGroupCallHandler from '../../../../utils/webRTC/webRTCGroupCallHandler';
import GroupCallRoom from '../GroupCallRoom/GroupCallRoom';
const GroupCall = ({
  callState,
  localStream,
  groupCallActive,
  groupCallStreams,
}) => {
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
      {groupCallActive && <GroupCallRoom groupCallStreams={groupCallStreams} />}
      {groupCallActive && (
        <GroupCallButton onClickHandler={LeaveRoom} label='离开房间' />
      )}
    </>
  );
};

const mapStateTopProps = ({ call }) => ({
  ...call,
});

export default connect(mapStateTopProps)(GroupCall);
