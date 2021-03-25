

import ConfigConstant from '../config/ConfigContants'
import { json_to_query_string, setUrlParams } from '../helpers/common'
import Http from '../customRequest'
let http = Http


export default class AxiosClient {

  static executeWithCache ({ url, method, params, config, accessToken }) {
    let configAxios = { ...(config || {}) }

    let token = accessToken || ''
    // if (!token && typeof window !== 'undefined') {
    //   const store = window.__NEXT_REDUX_STORE__
    //   const state = store.getState()
    //   token = state?.App?.token
    // }
    if (token) {
      configAxios.headers = { ...(configAxios.headers || {}), Authorization: token || '' }
    }
    const { API_METHOD } = ConfigConstant
    switch (method) {
      case API_METHOD.GET: {
        let newUrl = setUrlParams(url, params)
        const axiosUrl = newUrl?.href
        return http.get(axiosUrl, configAxios || {}).then(res => {
          return responseData.createResponseData(res || {})
        }).catch(e => {
          console.log('ERROR: GET', url, e?.response)
          const response = e?.response || {}
          this.handleBlockAccount(response)
          return responseData.createResponseData(response || {})
        })
      }
      case API_METHOD.POST: {
        let data = json_to_query_string(params || {})
        if (config?.headers) data = params || {}
        return http.post(url, data, configAxios || {}).then(res => {
          return responseData.createResponseData(res || {})
        }).catch(e => {
          const response = e?.response || {}
          this.handleBlockAccount(response)
          return responseData.createResponseData(response || {})
        })
      }
    }
  }

}
class responseData {

  constructor () {
    this.success = false
    this.statusText = ''
    this.message = ''
    this.data = null
    this.httpCode = 0
  }

  static createResponseData (_data) {
    let data = new responseData()
    if (_data) {
      data.httpCode = _data.status
      data.success = _data.status === 200
      data.statusText = _data.statusText || ''
      if (_data.problem && _data.problem === 'TIMEOUT_ERROR') {
        data.message = 'Request timeout'
      }
      data.message = _data.message || ''
      if (Array.isArray(_data.data)) {
        data.data = { items: _data.data }
      } else {
        data.data = _data.data || null
      }
    }
    return data
  }
}
