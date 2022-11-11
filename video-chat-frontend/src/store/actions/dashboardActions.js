//定义type类型
export const DASHBOARD_SET_USERNAME = 'DASHBOARD_SET_USERNAME';
export const DASHBOARD_SET_ACTIVE_USERS = 'DASHBOARD_SET_ACTIVE_USERS';
export const DASHBOARD_SET_GROUP_CALL_ROOMS = 'DASHBOARD_SET_GROUP_CALL_ROOMS';
//不同action行为
export const setUsername = (username) => {
  return {
    type: DASHBOARD_SET_USERNAME,
    username,
  };
};

export const setActiveUsers = (activeUsers) => {
  return {
    type: DASHBOARD_SET_ACTIVE_USERS,
    activeUsers,
  };
};

export const setGroupCalls = (groupCallRooms) => {
  return {
    type: DASHBOARD_SET_GROUP_CALL_ROOMS,
    groupCallRooms,
  };
};
