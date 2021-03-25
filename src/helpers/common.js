import LocalStorage from "../config/LocalStorage";
import ConfigCookie from "../config/ConfigCookie";

const setUrlParams = (url, params) => {
  let newUrl = new URL(url);
  (params && Object.keys(params)) && Object.keys(params).forEach(key => {
    if (params[key]) {
      newUrl.searchParams.set(key, params[key])
    }
  })
  return newUrl
}
const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const json_to_query_string = (json) => {
  return Object.keys(json)
    .map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
    .join('&')
}

const handleLocalStorage  = (action, key, value) => {

  if (typeof window === 'undefined' || !window.localStorage) return ''
  try {
    if (action === LocalStorage.GET) {
      return (window.localStorage.getItem(key))
    } else if (action === LocalStorage.SET) {
      return window.localStorage.setItem(key, value)
    } else if (action === LocalStorage.REMOVE) {
      return window.localStorage.removeItem(key)
    }
    if (action === LocalStorage.CLEAR) {
      return window.localStorage.clear()
    }
  } catch (e) {
    return { error: e }
  }
}

const saveAccessToken  = (accessToken, notReload) => {
  //time expire token
  const timeNow = new Date()
  timeNow.setFullYear(timeNow.getFullYear() + 1)
  //save access token
  const option = {
    expires: timeNow,
    domain: '.vieon.vn',
    path: '/'
  }
  try {
    const key = ConfigCookie.getTokenKey()
    const type = ConfigCookie.METHOD.SAVE
    const value = accessToken
    ConfigCookie.handleCookie({ type, key, value, option })
    ConfigCookie.handleCookie({
      type: ConfigCookie.METHOD.REMOVE,
      key: ConfigCookie.KEY.ANONYMOUS_TOKEN,
      option
    })
  } catch (e) {
    throw e
  }
}



export {
  setUrlParams,
  validateEmail,
  saveAccessToken,
  handleLocalStorage,
  json_to_query_string
}
