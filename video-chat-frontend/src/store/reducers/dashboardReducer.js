import * as dashboardActions from '../actions/dashboardActions';

//初始化state
const initialState = {
  username: '',
  activeUsers: [],
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
    default:
      return state;
  }
};
export default reducer;
