import React from 'react';
import { connect } from 'react-redux';
import LocalVideoView from '../LocalVideoView/LocalVideoView';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';

const DirectCall = ({ localStream, remoteStream }) => {
  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
    </>
  );
};
const mapStateToProps = ({ call }) => {
  return { ...call };
};

export default connect(mapStateToProps, null)(DirectCall);
