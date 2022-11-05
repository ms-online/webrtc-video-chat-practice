import React, { useEffect, useRef } from 'react';
import logo from '../../resources/logo.png';
import * as webRTCHandler from '../../utils/webRTC/webRTCHandler';
import ActiveUserList from './components/ActiveUserList';
import './Dashboard.css';

const Dashboard = () => {
  const firstRenderRef = useRef(true);
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    webRTCHandler.getLocalStream();
  }, []);
  return (
    // 外层容器
    <div className='dashboard_container background_main_color'>
      {/* 左侧部分  */}
      <div className='dashboard_left_section'>
        {/* 内容介绍 */}
        <div className='dashboard_content_container'>内容</div>
        <div className='dashboard_rooms_container background_secondary_color'>
          房间
        </div>
      </div>
      {/* 右侧部分 */}
      <div className='dashboard_right_section background_secondary_color'>
        {/* 活跃用户 */}
        <div className='dashboard_active_users_list'>
          <ActiveUserList />
        </div>
        {/* logo */}
        <div className='dashboard_logo_container'>
          <img className='dashboard_logo_image' src={logo} alt='VideoChat' />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
