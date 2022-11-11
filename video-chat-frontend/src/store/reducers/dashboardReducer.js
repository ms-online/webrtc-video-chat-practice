import * as dashboardActions from '../actions/dashboardActions';

//初始化state
const initialState = {
  username: '',
  activeUsers: [],
  groupCallRooms: [],
};

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case dashboardActions.DASHBOARD_SET_USERNAME:
      return {
        ...state,
        username: action.username,
      };
    case dashboardActions.DASHBOARD_SET_ACTIVE_USERS:
      return {
        ...state,
        activeUsers: action.activeUsers,
      };
    case dashboardActions.DASHBOARD_SET_GROUP_CALL_ROOMS:
      return {
        ...state,
        groupCallRooms: action.groupCallRooms,
      };
    default:
      return state;
  }
};
export default reducer;
