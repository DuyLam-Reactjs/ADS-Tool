import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import {UserAction} from "../actions";



class TheLayout extends PureComponent {
  static async getInitialProps ({ store, req, res }) {

    if (req) { // call on server

      const pathname = req?._parsedUrl?.pathname

      if (pathname !== '/') {
        UserApi.checkRedirect(pathname).then(resp => {
          if(resp?.data?.http_status === 410) {
            res.status(410)
          } else if (resp?.data?.from_to !== resp?.data?.from_url) {
            res.writeHead(resp?.data?.http_status, { Location: resp?.data?.from_to })
            res.end()
          }
        })
      }

      // Detect is mobile
      const userAgent = req?.headers?.['user-agent']

      const { isMobile, isTablet } = mobileCheckFromUserAgent(userAgent)

      // GET cookie from server
      const cookie = req?.cookies
      const tokenKey = ConfigCookie.getTokenKey()
      const accessToken = cookie?.[tokenKey]
      const anonymousToken = cookie?.[ConfigCookie.KEY.ANONYMOUS_TOKEN]

      // save Access Token
      const setToken = await AppAction.setToken(accessToken || anonymousToken)
      await store.dispatch(setToken)

      if (accessToken) {

        // Get profile
        const profile = await ProfileAction.getProfile(accessToken)
        await store.dispatch(profile)

      }
      // Dispatch Mobile
      const setMobile = await AppAction.setMobile(isMobile)
      await store.dispatch(setMobile)

      const setTablet = await AppAction.setTablet(isTablet)
      await store.dispatch(setTablet)

      const { isSafari } = detectBrowser(userAgent)
      // Dispatch Mobile
      const setBrowser = await AppAction.setBrowser({ isSafari })
      await store.dispatch(setBrowser)

      const data = await MenuAction.getMenu({ slug: pathname, accessToken, isMobile })
      await store.dispatch(data)

      const seoConfig = await SeoAction.getSeoTextConfig(pathname)
      await store.dispatch(seoConfig)

      return { data, ssr: true }
    }
    return {}

  }

  render() {
    const {data} = this.props
    const {profile} = data?.profile
    return(
      <div className="c-app c-default-layout">
        <TheHeader profile={profile}/>
        <TheSidebar/>
        <div className="c-wrapper" style={{marginTop: '3rem'}}>
          <div className="c-body">
            <TheContent/>
          </div>
          <TheFooter/>
        </div>
      </div>
    )}
}

const mapStateToProps = ({ User }) => {
  return Object.assign(
    User || {},
  )
}

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators(
    {
      getLogin: UserAction.getLogin,
      changePassword: UserAction.changePassword,
    },
    dispatch
  )
  return { ...actions, dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheLayout)

