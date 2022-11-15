import React, { useState, useEffect } from 'react';
import { sendMessageUsingDataChannel } from '../../../../utils/webRTC/webRTCHandler';
import MessageDisplayer from './MessageDisplayer';

import './Messagers.css';
const Messagers = ({ message, setDireactCallMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleOnKeyDownEvent = (e) => {
    if (e.keyCode === 13) {
      sendMessageUsingDataChannel(inputValue);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (message.received) {
      setTimeout(() => setDireactCallMessage(false, ''), [4000]);
    }
  }, [message.received]);

  return (
    <>
      <input
        className='messages_input'
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='请输入消息....'
        onKeyDown={handleOnKeyDownEvent}
      />
      {message.received && <MessageDisplayer message={message.content} />}
    </>
  );
};

export default Messagers;
