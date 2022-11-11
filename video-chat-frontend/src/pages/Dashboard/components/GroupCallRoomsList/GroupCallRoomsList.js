import React from 'react';
import GroupCallRoomsListItem from './GroupCallRoomsListItem';
import './GroupCallRoomsList.css';

const dummyList = [
  {
    roomId: '123123',
    hostName: 'Summer',
  },
  {
    roomId: '3213213',
    hostName: 'Lucy',
  },
];

const GroupCallRoomsList = () => {
  return (
    <>
      {dummyList.map((room) => (
        <GroupCallRoomsListItem key={room.roomId} room={room} />
      ))}
    </>
  );
};

export default GroupCallRoomsList;
