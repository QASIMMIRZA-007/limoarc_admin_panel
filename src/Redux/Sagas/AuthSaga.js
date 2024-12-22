import { put, takeLatest } from "redux-saga/effects"
import { ApiCall } from "../../Services/apis"
import Swal from "sweetalert2"
import { ACTIONS } from "../Action-types"
import { setLoader } from "../Actions/GeneralActions"
import {
  getSingleUser,
  setLoginData,
  setSingleUser,
} from "../Actions/AuthActions"

function* loginRequest(params) {
  try {
    const res = yield ApiCall({
      params: params?.data,
      route: "auth/login/admin",
      verb: "post",
    })

    if (res?.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Successfully",
        showConfirmButton: false,
        timer: 2000,
      })
      yield put(setLoginData(res?.response))

      params.history.push("/admin/dashboard")
      yield put(setLoader(false))
    } else {
      Swal.fire(`${res.response.message}`, "Try again", "error")
      yield put(setLoader(false))
    }
  } catch (e) {
    console.log("saga login error -- ", e.toString())
    yield put(setLoader(false))
  }
}

export function* loginSaga() {
  yield takeLatest(ACTIONS.LOGIN, loginRequest)
}

function* GetSingleUserRequest(params) {
  console.log("params", params)
  try {
    const res = yield ApiCall({
      route: "admin/admin_detail",
      verb: "get",
      token: params?.data,
    })
    console.log(res)
    if (res?.status === 200) {
      yield put(setSingleUser(res.response?.admin))
      yield put(setLoader(false))
    } else {
      alert(res?.response?.message)
      console.log("error", res?.response)

      yield put(setLoader(false))
    }
  } catch (e) {
    console.log("saga sign up err --- ", e)
    yield put(setLoader(false))
  }
}
export function* GetSingleUserSaga() {
  yield takeLatest(ACTIONS.GET_SINGLE_USER, GetSingleUserRequest)
}

// update user profile

function* UpdateUserPro(params) {
  try {
    const res = yield ApiCall({
      params: params.data.data,
      route: "admin/update_admin",
      verb: "put",
      token: params?.data?.token,
    })
    // console.log("res", res);
    if (res?.status === 200) {
      // console.log("sdf");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Updated",
        showConfirmButton: true,
        timer: 30000,
      })
      yield put(getSingleUser(params.data.token))
      yield put(setLoader(false))
    } else {
      console.log("error", res?.response)
      Swal.fire(`${res.response.message}`, "Try again", "error")
      yield put(setLoader(false))
    }
  } catch (e) {
    console.log("saga sign up err --- ", e)
    yield put(setLoader(false))
  }
}
export function* UpdateUserProfileSaga() {
  yield takeLatest(ACTIONS.UPDATE_USER_PROFILE, UpdateUserPro)
}

function* submitFirebaseToken(params) {
  console.log(params, "submit firebase token")
  try {
    const res = yield ApiCall({
      params: params?.data,
      route: "app_api/change_user_firebase_token",
      verb: "put",
    })
    if (res?.status === 200) {
    } else {
      // Swal.fire(`${res.response.message}`, "Try again", "error")
      yield put(setLoader(false))
    }
  } catch (e) {
    console.log("saga login error -- ", e.toString())
    yield put(setLoader(false))
  }
}

export function* submitFirebaseTokenSaga() {
  yield takeLatest(ACTIONS.SUBMIT_FIREBASE_TOKEN, submitFirebaseToken)
}