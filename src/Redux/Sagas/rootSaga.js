import { all } from "redux-saga/effects"
import {
  GetSingleUserSaga,
  loginSaga,
  signUpGuestSaga,
  signUpSaga,
  signUpUserSaga,
  submitFirebaseTokenSaga,
  UpdateUserProfileSaga,
} from "./AuthSaga"
import {
  watchChangeLayoutType,
  watchChangeLayoutWidth,
  watchChangeLeftSidebarTheme,
  watchChangeLeftSidebarType,
  watchChangeTopbarTheme,
  watchShowRightSidebar,
} from "./saga"
export function* rootSaga() {
  yield all([
    loginSaga(),
    watchChangeLayoutType(),
    watchChangeLayoutWidth(),
    watchChangeLeftSidebarTheme(),
    watchChangeLeftSidebarType(),
    watchShowRightSidebar(),
    watchChangeTopbarTheme(),
    GetSingleUserSaga(),
    UpdateUserProfileSaga(),
    submitFirebaseTokenSaga(),
  ])
}
