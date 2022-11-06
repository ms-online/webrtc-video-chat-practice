import React from 'react';
import { connect } from 'react-redux';
import CallingDialog from '../CallingDialog/CallingDialog';
import CallRejectDialog from '../CallRejectDialog/CallRejectDialog';
import IncomingCallDialog from '../IncomingCallDialog/IncomingCallDialog';
import LocalVideoView from '../LocalVideoView/LocalVideoView';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';
import { callStates } from '../../../../store/actions/callActions';
const DirectCall = ({
  localStream,
  remoteStream,
  callerUsername,
  callState,
  callingDialogVisible,
}) => {
  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
      {/* 不同状态下的直接呼叫对话框 */}
      {/* <CallRejectDialog /> */}
      {callState === callStates.CALL_REQUESTED && (
        <IncomingCallDialog callerUsername={callerUsername} />
      )}
      {callingDialogVisible && <CallingDialog />}
    </>
  );
};
const mapStateToProps = ({ call }) => {
  return { ...call };
};

export default connect(mapStateToProps, null)(DirectCall);
