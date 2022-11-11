import React from 'react';
import { connect } from 'react-redux';
import GroupCallRoomsListItem from './GroupCallRoomsListItem';
import './GroupCallRoomsList.css';

const GroupCallRoomsList = ({ groupCallRooms }) => {
  console.log(groupCallRooms);
  return (
    <>
      {groupCallRooms?.map((room) => (
        <GroupCallRoomsListItem key={room.roomId} room={room} />
      ))}
    </>
  );
};

const mapStateToProps = ({ dashboard }) => ({
  ...dashboard,
});
export default connect(mapStateToProps)(GroupCallRoomsList);
