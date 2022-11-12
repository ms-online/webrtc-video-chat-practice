import React from 'react';
import ConversationButtons from '../ConversationButtons/ConversationButtons';
import './GroupCallRoom.css';

const GroupCallRoom = () => {
  return (
    <div className='group_call_room_container'>
      <span className='group_call_title'>群组呼叫</span>
      <div className='group_call_videos_container'>
        显示加入房间的用户的媒体流
      </div>
      {/* 会话按钮 */}
      <ConversationButtons />
    </div>
  );
};

export default GroupCallRoom;
