import React from 'react';
import './IncomingCallDialog.css';
const IncomingCallDialog = ({ callerUsername }) => {
  const handleAcceptButtonPressed = () => {
    //接听呼叫
  };

  const handleRejectButtonPressed = () => {
    //拒绝呼叫
  };
  return (
    <div className='direct_calling_dialog background_secondary_color'>
      <span className='direct_call_dialog_caller_name'>
        {callerUsername}的来电
      </span>
      <div className='direct_call_dialog_button_container'>
        <button
          className='direct_call_dialog_accept_button'
          onClick={handleAcceptButtonPressed}
        >
          接听
        </button>
        <button
          className='direct_call_dialog_reject_button'
          onClick={handleRejectButtonPressed}
        >
          拒绝
        </button>
      </div>
    </div>
  );
};

export default IncomingCallDialog;
