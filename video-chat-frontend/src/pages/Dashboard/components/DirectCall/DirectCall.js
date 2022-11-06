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
} from '../../../../store/actions/callActions';
const DirectCall = ({
  localStream,
  remoteStream,
  callerUsername,
  callState,
  callingDialogVisible,
  callRejected,
  hideCallRejectedDialog,
}) => {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectCall);
