import React from 'react';
import './DashboardInformation.css';
const DashboardInformation = ({ username }) => {
  return (
    <div className='dashboard_info_text_container'>
      <span className='dashboard_info_text_title'>
        欢迎{username}进入VideoChat音视频应用
      </span>
      <span className='dashboard_info_text_description'>
        * 你可以直接点击右侧在线用户，进行一对一的直接呼叫；
        <br />* 你也可以创建或加入群组呼叫房间，进行多人音视频聊天；
      </span>
    </div>
  );
};

export default DashboardInformation;
