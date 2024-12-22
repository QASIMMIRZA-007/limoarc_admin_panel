import { ACTIONS } from "../Action-types";

const initialState = {
  onlineUsers: [],
};

const onlineUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.data?.onlineUsers,
      };
    case ACTIONS.ADD_ONLINE_USER:
      return {
        ...state,
        onlineUsers: [...state.onlineUsers, action.data?.userId],
      };
    case ACTIONS.REMOVE_ONLINE_USER:
      return {
        ...state,
        onlineUsers: state.onlineUsers.filter(
          (userId) => userId !== action.data?.userId
        ),
      };
    default:
      return state;
  }
};

export default onlineUsersReducer;
