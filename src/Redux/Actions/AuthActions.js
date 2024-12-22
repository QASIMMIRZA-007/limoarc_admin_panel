import { ACTIONS } from "../Action-types/index"

export const loginRequest = (data, history) => ({
  type: ACTIONS.LOGIN,
  data,
  history,
})
export const setLoginData = (data) => ({
  type: ACTIONS.FETCH_LOGIN_DATA,
  data,
})

export const logout = data => ({
  type: ACTIONS.LOGOUT,
  data,
})
export const getSingleUser = data => ({
  type: ACTIONS.GET_SINGLE_USER,
  data,
})

export const submitFirebaseToken = data => {
  return {
    type: ACTIONS.SUBMIT_FIREBASE_TOKEN,
    data,
  }
}

export const setSingleUser = data => ({
  type: ACTIONS.SET_SINGLE_USER,
  data,
})

export const UpdateUserProfile = data => ({
  type: ACTIONS.UPDATE_USER_PROFILE,
  data,
})
