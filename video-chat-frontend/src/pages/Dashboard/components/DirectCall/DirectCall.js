import React from 'react';
import { connect } from 'react-redux';
import CallingDialog from '../CallingDialog/CallingDialog';
import CallRejectDialog from '../CallRejectDialog/CallRejectDialog';
import IncomingCallDialog from '../IncomingCallDialog/IncomingCallDialog';
import LocalVideoView from '../LocalVideoView/LocalVideoView';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';
import {
  callStates,
  setCallRejected,
  setLocalCameraEnabled,
  setLocalMicrophoneEnabled,
} from '../../../../store/actions/callActions';
import ConversationButtons from '../ConversationButtons/ConversationButtons';
const DirectCall = (props) => {
  const {
    localStream,
    remoteStream,
    callerUsername,
    callState,
    callingDialogVisible,
    callRejected,
    hideCallRejectedDialog,
  } = props;
  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
      {/* 不同状态下的直接呼叫对话框 */}
      {callRejected.rejected && (
        <CallRejectDialog
          reason={callRejected.reason}
          hideCallRejectedDialog={hideCallRejectedDialog}
        />
      )}
      {callState === callStates.CALL_REQUESTED && (
        <IncomingCallDialog callerUsername={callerUsername} />
      )}
      {callingDialogVisible && <CallingDialog />}
      <ConversationButtons {...props} />
    </>
  );
};
const mapStateToProps = ({ call }) => {
  return { ...call };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideCallRejectedDialog: (callRejectedDetails) =>
      dispatch(setCallRejected(callRejectedDetails)),
    setCameraEnabled: (enabled) => dispatch(setLocalCameraEnabled(enabled)),
    setMicrophoneEnabled: (enabled) =>
      dispatch(setLocalMicrophoneEnabled(enabled)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectCall);
