import React from 'react';
import userAvatar from '../../../resources/userAvatar.png';

function ActiveUserListItem({ activeUser }) {
  const handlerListItemPressed = () => {
    //点击活跃用户-进行呼叫
  };
  return (
    <div className='active_user_list_item' onClick={handlerListItemPressed}>
      <div className='active_user_list_image_container'>
        <img
          className='active_user_list_image'
          src={userAvatar}
          alt='活跃用户'
        />
      </div>
      <span className='active_user_list_text'>{activeUser.username}</span>
    </div>
  );
}

export default ActiveUserListItem;
