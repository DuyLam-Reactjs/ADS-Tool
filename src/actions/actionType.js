export const ACTION_TYPE = {
//user action
  LOGIN : 'LOGIN',
  REGISTER : 'REGISTER',
  CHANGE_PASSWORD : 'CHANGE_PASSWORD',

}

export const createAction = (type, data) => {
	return {type, data}
}
