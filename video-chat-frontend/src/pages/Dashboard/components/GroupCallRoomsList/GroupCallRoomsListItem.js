import React from 'react';

const GroupCallRoomsListItem = ({ room }) => {
  const handleListItemPressed = () => {
    //加入群组呼叫
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
