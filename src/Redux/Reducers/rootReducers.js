import { combineReducers } from "redux"
import authReducer from "./AuthReducers"
import GeneralReducers from "./GeneralReducers"
import onlineUsersReducer from "./OnlineUsersReducer"

export const rootReducer = combineReducers({
  auth: authReducer,
  general: GeneralReducers,
  onlineUsers: onlineUsersReducer,
})
