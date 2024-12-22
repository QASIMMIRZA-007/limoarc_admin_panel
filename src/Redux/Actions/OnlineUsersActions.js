import { ACTIONS } from "../Action-types/index";

export const setOnlineUsers = (data) => ({
  type: ACTIONS.SET_ONLINE_USERS,
  data,
});
