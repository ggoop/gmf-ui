'use strict';

import axios from 'axios';
import combineURLs from 'gmf/core/utils/MdCombineURLs';
import pick from 'lodash.pick';
var user_agent = navigator.userAgent.toLowerCase();
var IS_MICRO_MESSENGER = -1 != user_agent.indexOf("micromessenger");
var IS_ANDROID = -1 != user_agent.indexOf("android");
var IS_IOS = -1 != user_agent.indexOf("iphone") || -1 != user_agent.indexOf("ipad");

var CONFIG_COPY = {
  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，参数信息会通过log打出，仅在pc端时才会打印。
  gateway:'',//服务网关
  appId: '', //必填，应用的唯一标识
  entId:'',//企业Id
  timestamp: '', //必填，生成签名的时间戳
  nonceStr: '', //必填，生成签名的随机串
  signature: '', //必填，签名
  apiList: [] // 必填，需要使用的JS接口列表
};
var HTTP_API = false;
var CONFIG_DATA = {
  state: 0,
  ready: [],
  error: [],
  res: {},
  url: encodeURIComponent(location.href),
  systemType: IS_IOS ? 1 : IS_ANDROID ? 2 : -1,
};
const CONFIG_API = {
  config: {

  }
};
// function pick(obj, keys) {
//     return keys.map(k => k in obj ? {[k]: obj[k]} : {})
//                .reduce((res, o) => Object.assign(res, o), {});
// }
function _innerCallApi(conf) {
  if (CONFIG_DATA.state) {
    const c = pick(conf, ['data', 'timeout', 'responseType', 'maxContentLength', 'params', 'headers', 'method', 'url', 'baseURL']);
    HTTP_API(c).then(function(res) {
      conf && conf.success && conf.success(res);
      conf && conf.complete && conf.complete(res);
    }).catch(function(error) {
      conf && conf.fail && conf.fail(error);
      conf && conf.complete && conf.complete(error);
    });
  }
}

const gmf = {
  config(ORIG_CONF) {
    CONFIG_COPY = ORIG_CONF;
    if (!CONFIG_COPY.host) {
      alert('[assert]: host is required');
    }
    if (!CONFIG_COPY.appId) {
      alert('[assert]: appId is required');
    }
    if (!CONFIG_COPY.entId) {
      alert('[assert]: entId is required');
    }
    if (!CONFIG_COPY.timestamp) {
      alert('[assert]: timestamp is required');
    }
    if (!CONFIG_COPY.nonceStr) {
      alert('[assert]: nonceStr is required');
    }
    if (!CONFIG_COPY.signature) {
      alert('[assert]: signature is required');
    }
    HTTP_API = axios.create({ baseURL: combineURLs(CONFIG_COPY.host, 'api') });
    HTTP_API.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    HTTP_API.defaults.headers.post['Content-Type'] = 'application/json';
    //HTTP_API.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    axios
      .post('sys/jsapi/config', CONFIG_COPY, { baseURL: combineURLs(CONFIG_COPY.host, 'api') })
      .then((res) => {
        CONFIG_DATA.res = res.data;
        CONFIG_DATA.state = 1;
        for (var i = 0; i < CONFIG_DATA.ready.length; i++) {
          CONFIG_DATA.ready[i]();
        }
      })
      .catch((err) => {
        CONFIG_DATA.res = false;
        CONFIG_DATA.state = -1;
        for (var i = 0; i < CONFIG_DATA.error.length; i++) {
          CONFIG_DATA.error[i](err);
        }
      });
  },
  ready(callback) {
    CONFIG_DATA.ready.push(callback);
  },
  error(callback) {
    CONFIG_DATA.error.push(callback);
  },

  checkApi(call_conf) {
    /*
    {apiList: ['chooseImage']success:function(res){}}
    */
  },
  callApi(apiName, call_conf) {
    _innerCallApi(apiName, call_conf);
  },
};

gmf.version = '__VERSION__'
export default gmf;