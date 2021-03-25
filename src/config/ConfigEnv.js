// const DOMAIN_API = process.env.DOMAIN_API + '/'
const DOMAIN_API =  'https://dev-api.vieon.vn/backend' + '/'
const QNET_API = process.env.QNET_API || 'https://api.qnet.com.vn/'
const STATIC_DOMAIN = process.env.STATIC_DOMAIN + '/'
const DOMAIN_WEB = process.env.DOMAIN_WEB
const DOMAIN_MWEB = process.env.DOMAIN_MWEB
const VERSION = process.env.VERSION
const REPORT_LINK = process.env.REPORT_LINK || '/'
const SEGMENT_ID = process.env.SEGMENT_ID || ''
const WELCOME = process.env.WELCOME
const PAYMENT_URL = process.env.PAYMENT_URL || ''
const API_ENV = process.env.API_ENV || ''
const CAPTCHA_KEY = process.env.CAPTCHA_KEY || '6LfCAbUZAAAAAHznZrY-VjSo_IZUgYaOYXuVWCOf'
const DRM_SERVER_WIDEVINE = process.env.DRM_SERVER_WIDEVINE || "https://lic.drmtoday.com/license-proxy-widevine/cenc/"
const DRM_SERVER_FAIRPLAY = process.env.DRM_SERVER_FAIRPLAY || "https://lic.drmtoday.com/license-server-fairplay/"
const DRM_SERVER_FAIRPLAY_CERT = process.env.DRM_SERVER_FAIRPLAY_CERT || "https://lic.drmtoday.com/license-server-fairplay/cert/dzones"
const SENTRY_SERVER = process.env.SENTRY_SERVER || 'https://94d62f4ce36d4ae89f61d6168a2e32bf@sentryz.vieon.vn/21'
const SOCKET_SERVER = process.env.SOCKET_SERVER || 'socket.vieon.vn'
const BUILD_ID = typeof process.env.BUILD_ID !== 'undefined' ? process.env.BUILD_ID : new Date().getTime() + ''

module.exports = {
  ENV: process.env.NODE_ENV,
  SOCKET_SERVER,
  SENTRY_SERVER,
  DRM_SERVER_WIDEVINE,
  DRM_SERVER_FAIRPLAY,
  DRM_SERVER_FAIRPLAY_CERT,
  CAPTCHA_KEY,
  API_ENV,
  PAYMENT_URL,
  REPORT_LINK,
  SEGMENT_ID,
  WELCOME,
  DOMAIN_API,
  QNET_API,
  STATIC_DOMAIN,
  DOMAIN_WEB,
  DOMAIN_MWEB,
  APPLE_STORE_ID: process.env.APPLE_STORE_ID,
  GOOGLE_STORE_ID: process.env.GOOGLE_STORE_ID,
  IS_SERVER: !process.browser,
  BUILD_ID,
  VERSION,
}
