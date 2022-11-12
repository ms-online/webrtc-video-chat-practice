import React from 'react';
import * as webRTCGroupCallHandler from '../../../../utils/webRTC/webRTCGroupCallHandler';
const GroupCallRoomsListItem = ({ room }) => {
  const handleListItemPressed = () => {
    //加入群组呼叫
    webRTCGroupCallHandler.joinGroupCall(room.socketId, room.roomId);
  };
  return (
    <div
      className='group_calls_list_item background_main_color'
      onClick={handleListItemPressed}
    >
      <span>{room.hostName}</span>
    </div>
  );
};

export default GroupCallRoomsListItem;
