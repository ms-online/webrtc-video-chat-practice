import React from 'react';
import ConversationButton from './ConversationButton';
import {
  MdCallEnd,
  MdMic,
  MdMicOff,
  MdVideocam,
  MdVideocamOff,
  MdVideoLabel,
  MdVideoCall,
  MdCamera,
} from 'react-icons/md';
const styles = {
  buttonContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: '22%',
    left: '35%',
  },
  icon: {
    width: '25px',
    height: '25px',
    fill: '#e6e5e8',
  },
};

const ConversationButtons = () => {
  const handleMicButtonPressed = () => {
    //控制mic
  };

  const handleCameraButtonPressed = () => {
    //控制video
  };
  return (
    <div style={styles.buttonContainer}>
      <ConversationButton onClickHandler={handleMicButtonPressed}>
        <MdMic style={styles.icon} />
      </ConversationButton>
      <ConversationButton>
        <MdCallEnd style={styles.icon} />
      </ConversationButton>
      <ConversationButton onClickHandler={handleCameraButtonPressed}>
        <MdVideocam style={styles.icon} />
      </ConversationButton>
      <ConversationButton>
        <MdVideoLabel style={styles.icon} />
      </ConversationButton>
    </div>
  );
};

export default ConversationButtons;
