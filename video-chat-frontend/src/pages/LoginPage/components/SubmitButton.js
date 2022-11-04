import React from 'react';

function SubmitButton({ handleSubmitButtonPressed }) {
  return (
    <div className='login-page_button_container'>
      <button
        className='login-page_button background_main_color text_main_color'
        onClick={handleSubmitButtonPressed}
      >
        点击进入视频聊天
      </button>
    </div>
  );
}

export default SubmitButton;
