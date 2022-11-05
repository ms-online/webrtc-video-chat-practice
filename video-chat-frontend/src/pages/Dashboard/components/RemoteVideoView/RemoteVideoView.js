import React, { useRef, useEffect } from 'react';

const styles = {
  videoContainer: {
    width: '100%',
    height: '100%',
  },
  videoElement: {
    width: '100%',
    height: '100%',
  },
};

const RemoteVideoView = ({ remoteStream }) => {
  const remoteVideoRef = useRef();

  useEffect(() => {
    if (remoteStream) {
      const remoteVideo = remoteVideoRef.current;
      remoteVideo.srcObject = remoteStream;

      remoteVideo.onloadedmetadata = () => {
        remoteVideo.play();
      };
    }
  }, [remoteStream]);
  return (
    <div style={styles.videoContainer}>
      <video ref={remoteVideoRef} style={styles.videoElement} autoPlay />
    </div>
  );
};

export default RemoteVideoView;
