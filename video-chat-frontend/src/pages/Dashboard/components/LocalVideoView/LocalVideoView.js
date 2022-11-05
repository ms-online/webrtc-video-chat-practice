import React, { useRef, useEffect } from 'react';

const styles = {
  videoContainer: {
    width: '150px',
    height: '150px',
    borderRadius: '8px',
    position: 'absolute',
    top: '5%',
    right: '23%',
  },
  videoElement: {
    width: '100%',
    height: '100%',
  },
};

const LocalVideoView = ({ localStream }) => {
  const localVideoRef = useRef();

  useEffect(() => {
    if (localStream) {
      const localVideo = localVideoRef.current;
      localVideo.srcObject = localStream;
      //onloadedmetadata 事件在指定视频/音频（audio/video）的元数据加载后触发。
      localVideo.onloadedmetadata = () => {
        localVideo.play();
      };
    }
  }, [localStream]);
  return (
    <div style={styles.videoContainer} className='background_secondary_color'>
      <video ref={localVideoRef} style={styles.videoElement} autoPlay muted />
    </div>
  );
};

export default LocalVideoView;
