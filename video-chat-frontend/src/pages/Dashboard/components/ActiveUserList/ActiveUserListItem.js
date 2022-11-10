import React from 'react';
import userAvatar from '../../../../resources/userAvatar.png';
import { callStates } from '../../../../store/actions/callActions';
import { callToOtherUser } from '../../../../utils/webRTC/webRTCHandler';

function ActiveUserListItem({ activeUser, callState }) {
  const handlerListItemPressed = () => {
    //点击活跃用户-进行呼叫
    if (callState === callStates.CALL_AVAILABLE) {
      callToOtherUser(activeUser);
    }
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
