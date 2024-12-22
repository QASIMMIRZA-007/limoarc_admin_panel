import { ACTIONS } from "../Action-types"

const initialState = {
  adminToken: null,
  adminData: null,
  otpToken: null,
  categioryId: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_LOGIN_DATA:
      return {
        ...state,
        adminToken: action.data?.token,
        adminData: action.data?.user,
      }

    case ACTIONS.SET_SINGLE_USER:
      return {
        ...state,
        adminData: action.data,
      }
    case ACTIONS.LOGOUT:
      return {
        ...state,
        adminToken: null,
        adminData: null,
        otpToken: null,
      }

    default:
      return state
  }
}

export default authReducer
