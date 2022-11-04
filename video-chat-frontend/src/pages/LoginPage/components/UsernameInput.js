import React from 'react';

function UsernameInput({ username, setUsername }) {
  return (
    <div className='login-page_input_container'>
      <input
        placeholder='请输入你的昵称'
        type='text'
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        className='login-page_input background_main_color text_main_color'
      />
    </div>
  );
}

export default UsernameInput;
