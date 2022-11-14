import React from 'react';
import ConversationButtons from '../ConversationButtons/ConversationButtons';
import './GroupCallRoom.css';
import GroupCallVideo from './GroupCallVideo';

const GroupCallRoom = (props) => {
  const { groupCallStreams } = props;
  return (
    <div className='group_call_room_container'>
      <span className='group_call_title'>群组呼叫</span>
      <div className='group_call_videos_container'>
        {groupCallStreams.map((stream) => {
          return <GroupCallVideo key={stream.id} stream={stream} />;
        })}
      </div>
      {/* 会话按钮 */}
      <ConversationButtons {...props} groupCall />
    </div>
  );
};

export default GroupCallRoom;
