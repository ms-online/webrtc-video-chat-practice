//定义type类型
export const DASHBOARD_SET_USERNAME = 'DASHBOARD_SET_USERNAME';

//不同action行为
export const setUsername = (username) => {
  return {
    type: DASHBOARD_SET_USERNAME,
    username,
  };
};
