import React, { useState } from 'react';
import { connect } from 'react-redux';
import logo from '../../resources/logo.png';
import { useNavigate } from 'react-router-dom';
import SubmitButton from './components/SubmitButton';
import UsernameInput from './components/UsernameInput';
import { setUsername } from '../../store/actions/dashboardActions';
import { registerNewUser } from '../../utils/wssConnection/wssConnection';
import './LoginPage.css';

const LoginPage = ({ saveUsername }) => {
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  //提交handle函数
  const handleSubmitButtonPressed = () => {
    //注册新用户
    registerNewUser(username);
    //保存username到store
    saveUsername(username);
    //跳转到Dashboard页面
    navigate('/dashboard');
  };
  return (
    // 外层容器
    <div className='login-page_container background_main_color'>
      {/* 登录容器 */}
      <div className='login-page_login_box background_secondary_color'>
        {/* logo */}
        <div className='login-page_logo_container'>
          <img className='login-page_logo_image' src={logo} alt='VideoChat' />
        </div>
        {/* 标题 */}
        <div className='login-page_title_container'>
          <h2>欢迎来到登录页面</h2>
        </div>
        {/* input输入框 */}
        <UsernameInput username={username} setUsername={setUsername} />
        {/* 提交btn按钮 */}
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
      </div>
    </div>
  );
};

//将action作为props绑定给组件
const mapActionToProps = (dispatch) => {
  return {
    saveUsername: (username) => dispatch(setUsername(username)),
  };
};

export default connect(null, mapActionToProps)(LoginPage);
