import { BASE_URL } from "../Constants"
import axios from "axios"

export const ApiCall = async ({ params, route, verb, token, baseurl }) => {
  try {
    let url = null
    if (baseurl == false) {
      url = route
    } else {
      url = `${BASE_URL}${route}`
    }

    let response = null
    switch (verb) {
      case "get":
        response = await axios.get(
          url,

          token ? { headers: { "x-sh-auth": token } } : null
        )
        break
      case "get2":
        response = await axios.get(
          url,
          { params },
          token ? { headers: { "x-access-token": token } } : null
        )
        break
      case "post":
        response = await axios.post(
          url,
          params,

          token ? { headers: { "x-sh-auth": token } } : null
        )
        break

      case "put":
        response = await axios.put(
          url,
          params,

          token ? { headers: { "x-sh-auth": token } } : null
        )
        break
      case "patch":
        response = await axios.patch(
          url,
          params,
          token ? { headers: { "x-sh-auth": token } } : null
        )
        break
      case "delete":
        response = await axios.delete(
          url,
          token ? { headers: { "x-sh-auth": token } } : null,
          params
        )
        break

      default:
        return { code: "400", response: "method not found" }
        break
    }
    // console.log("response: ", response);
    if (response) {
      return await { status: 200, response: response.data }
    } else {
      return response
    }
  } catch (e) {
    console.log("response: ", e.response)
    console.log(e.response?.status)
    if (e.response?.status == 401 && token && token?.trim() !== "") {
      localStorage.clear()
      window.location.pathname = "/admin/"
    }
    return {
      status: 400,
      response: e?.response?.data
        ? e?.response?.data
        : { message: e.toString() },
    }
  }
}
