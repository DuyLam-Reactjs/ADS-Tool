import UserApi from "../apis/userApi";

function getLogin (email, password) {
  return dispatch => {
    return UserApi.login(email, password).then(res => {
      const result = {
        type: LOGIN,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}
function changePassword (changePassword, newPassword) {
  return dispatch => {
    return UserApi.login(changePassword, newPassword).then(res => {
      const result = {
        type: LOGIN,
        payload: res
      }
      dispatch(result)
      return res
    })
  }
}
module.exports = {

  getLogin,
  changePassword
}


