
import axios from "axios";
import Login from "../models/login";
import ConfigApi from "../config/ConfigApi";


class UserApi {
  static async login (email, password) {
    const url = ConfigApi.user.login
    const params = {
      email: email,
      password: password,
    }
    return axios.post(url, params ).then(res => {
      const data = new Login(res?.data)
      return {...res, data}
    })
  }
}

export default UserApi
