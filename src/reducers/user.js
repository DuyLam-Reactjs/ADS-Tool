import * as UserAction from '../actions/user'
import {ACTION_TYPE} from "../actions/actionType";

const userReducer = (state = {}, action) => {
  const result = { ...state }
  const dataPayload = action?.payload?.data
  switch (action.type) {
    case ACTION_TYPE.LOGIN:
      result[action.type] = dataPayload
      break
    case ACTION_TYPE.REGISTER:
      result[action.type] = dataPayload
      break
    case ACTION_TYPE.CHANGE_PASSWORD:
      result[action.type] = dataPayload
      break
    default:
      break
  }
  return result
}

export default userReducer
