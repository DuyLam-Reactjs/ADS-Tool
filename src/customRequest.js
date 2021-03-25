import axios from "axios/index";
import cookie from 'react-cookies';
import ConfigConstants from '../src/config/ConfigContants'
import ConfigCookie from './config/ConfigCookie'

const http = axios.create({
	// baseURL: '/',
	// headers: { 'Cache-Control': 'no-cache' },
	// disable the default cache and set the cache flag
	/*adapter: cacheAdapterEnhancer(axios.defaults.adapter,
		{
			enabledByDefault: false,
			defaultCache: new LRUCache({
					maxAge: 1000 * 600, max: 100
				}
			)
		})*/
})

axios.interceptors.request.use(cfg => {
    cfg.timeout = 10000;
    if(!cfg.params){
        cfg.params = {}
    }
    const accessToken = cookie.load(ConfigCookie.getTokenKey());
    if (accessToken) {
        cfg.headers['Authorization'] = accessToken || '';
        return cfg;
    }

    const anonymousToken = cookie.load(ConfigConstants.ANONYMOUS_TOKEN);
    if (anonymousToken) {
        cfg.headers['Authorization'] = anonymousToken || ''

        return cfg
    }

    return cfg

}, error => {
    return Promise.reject(error);
});
export default axios
