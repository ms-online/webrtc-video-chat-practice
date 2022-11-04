import React from 'react';
import ActiveUserListItem from './ActiveUserListItem';
import { connect } from 'react-redux';
import './ActiveUserList.css';
function ActiveUserList({ activeUsers }) {
  //虚拟活跃用户
  // const activeUsers = [
  //   {
  //     socketId: 123,
  //     username: 'Summer',
  //   },
  //   {
  //     socketId: 234,
  //     username: 'Henry',
  //   },
  //   {
  //     socketId: 345,
  //     username: 'Lucy',
  //   },
  //   {
  //     socketId: 456,
  //     username: 'Jhon',
  //   },
  // ];
  return (
    <div className='active_user_list_container'>
      {activeUsers.map((activeUser) => (
        <ActiveUserListItem key={activeUser.socketId} activeUser={activeUser} />
      ))}
    </div>
  );
}

//将store作为props绑定给组件
const mapStateToProps = ({ dashboard }) => ({ ...dashboard });

export default connect(mapStateToProps)(ActiveUserList);
