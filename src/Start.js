import Vue from 'vue';
import Vuex from 'vuex';
import http from './core/utils/http';
import VueRouter from 'vue-router';
import extend from 'lodash/extend'
import merge from 'lodash/merge'
import isString from 'lodash/isString'
import values from 'lodash/values'
import lang from './utils/lang';
import gmfConfig from './config';
import enumCache from './core/utils/MdEnumCache';
import storeConfig from './store';
import Vuei18n from 'vue-i18n'
import combineURL from './core/utils/MdCombineURLs'


function getAppConfig(){
  return {
    methods: {
      changedConfig() {
        extend(window.gmfConfig, this.configs);
        this.$http.defaults.headers.common.Ent = this.configs.ent ? this.configs.ent.id : false;
        if (this.configs.token) {
          this.$http.defaults.headers.common.Authorization = (this.configs.token.token_type ? this.configs.token.token_type : "Bearer") + " " + this.configs.token.access_token;
        } else {
          this.$http.defaults.headers.common.Authorization = false;
        }
      },
      loadEnums() {
        return new Promise((resolved, rejected)=> {
          this.$http.get('sys/enums/all').then(res=>{
            if (res && res.data && res.data.data) {
              res.data.data.forEach((item) => {
                this.setCacheEnum(item);
              });
            }
            resolved();
          },err=>{
            rejected();
          });
        });
      },
      setCacheEnum(item) {
        enumCache.set(item);
      },
      getCacheEnum(type) {
        return enumCache.get(type);
      },
      getCacheEnumName(type, item) {
        return enumCache.getEnumName(type, item);
      },
      issueUid() {
        return new Promise((resolved, rejected)=> {
          this.$http.get('sys/datas/uid').then(res=>{
            resolved(res.data.data);
          },err=>{
            rejected(false);
          });
        });
      },
      issueSn(node, num) {
        return new Promise((resolved, rejected)=> {
          this.$http.get('sys/datas/sn', { params: { node: node, num: num } }).then(res=>{
            resolved(res.data.data);
          },err=>{
            rejected(false);
          });
        });
      }
    }
  };
}

export default class Start {
  constructor(columnComponent) {
    this.routes = [];
  }
  use(component) {
    Vue.use(component);
  }
  route(routes) {
    gmfConfig.route(routes);
  }
  store(store) {
    gmfConfig.store(store);
  }
  i18n(locale,name,i18n){
    gmfConfig.i18n(locale,name,i18n);
  }
  run(options, mixin) {
    options = options || {};
    const elID = options.elID || '#gmfApp';
    /*routes*/
    Vue.use(VueRouter);
    var routes = gmfConfig.routes;
    this.init(options);
    if (options.routes) {
      routes = routes.concat(options.routes);
    }
    const router = {
      mode: 'history',
      routes: routes,
      scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition
        } else {
          if (from.meta.keepAlive) {
            from.meta.savedPosition = document.body.scrollTop
          }
          return { x: 0, y: to.meta.savedPosition || 0 }
        }
      },
    };
    const vueRouter = new VueRouter(router);
    vueRouter.beforeEach((to, from, next) => {
      if (to.meta.requiresAuth && !rootData.configs.user) {
        if (isString(rootData.configs.auth.route)) {
          next(rootData.configs.auth.route + "?continue=" + to.fullPath);
        } else {
          next(extend({}, rootData.configs.auth.route, { query: { continue: to.fullPath } }));
        }
      } else {
        next();
      }
    });

    /*store*/
    Vue.use(Vuex);
    if (gmfConfig.stores && gmfConfig.stores.length > 0) {
      storeConfig.modules = {};
      gmfConfig.stores.forEach(item => {
        storeConfig.modules[item.name] = item;
      });
    }
    const store = new Vuex.Store(storeConfig);

    //Vuei18n
    Vue.use(Vuei18n);
    const i18n = new Vuei18n({
      locale:options.locale||'zh',
      messages: gmfConfig.i18ns.messages
    })

    //rootData
    const rootData = {
      'appName': '',
      'title': '',
      'configs': { home: '/', ent: false, user: false, token: false, auth: { route: { name: 'auth.login' } } }
    };
    
    

    document.addEventListener('DOMContentLoaded', () => {
      Promise.all(values(options)).then(function(values) {
        if (window.gmfConfig) {
          extend(rootData.configs, window.gmfConfig);
        }
        const appConfig=getAppConfig();
        appConfig.router=vueRouter;
        appConfig.store= store;
        appConfig.data= rootData;  
        appConfig.i18n=i18n;
        if(options.app){
          appConfig.render=(mount)=> mount(options.app);
        }
        if(mixin){
          appConfig.mixins=[mixin];
        }
        const app = new Vue(appConfig);
        vueRouter.onReady(() => {app.$mount(elID);});
      });
    });
  }
  init(options) {
    options=options||{};
    http.defaults.baseURL =combineURL(options.host,'/api');
    http.defaults.headers = { common: { Ent: false } };
    Vue.prototype.$http = http;

    Vue.prototype.$toast = function(toast) {
      this.$root.$refs.rootToast && this.$root.$refs.rootToast.toast(toast);
    }
    Vue.prototype.$setConfigs = function(configs) {
      extend(this.$root.configs, configs);
      this.$root.changedConfig();
    }
    Vue.prototype.$lang = lang;
    Vue.prototype.$go = function(options, isReplace) {
      this.$router && this.$router[isReplace ? 'replace' : 'push'](options);
    };
    Vue.prototype.$goID = function(id, options, isReplace) {
      var localtion = { name: 'id', params: { id: id } };
      isReplace = !!isReplace;
      localtion = merge(localtion, options);
      this.$router && this.$router[isReplace ? 'replace' : 'push'](localtion);
    };
    Vue.prototype.$goModule = function(module, options, isReplace) {
      var localtion = { name: 'module', params: { module: module } };
      isReplace = !!isReplace;
      localtion = merge(localtion, options);
      this.$router && this.$router[isReplace ? 'replace' : 'push'](localtion);
    };
    Vue.prototype.$goApp = function(app, options, isReplace) {
      var localtion = { name: 'app' };
      isReplace = !!isReplace;
      localtion = merge(localtion, options, { params: { app: app } });
      this.$router && this.$router[isReplace ? 'replace' : 'push'](localtion);
    };
    Vue.prototype.$hasRole = function(roles) {
      if (!roles || !this.$root.configs || !this.$root.configs.roles) return false;
      if (isString(roles)) {
        roles = roles.split(',');
      }
      return roles.map((v) => {
        return this.$root.configs.roles.indexOf(v) >= 0;
      }).filter(v => v).length > 0;
    };
    Vue.prototype.$canPermit = function(permits) {
      if (!permits || !this.$root.configs || !this.$root.configs.permits) return false;
      if (isString(roles)) {
        roles = roles.split(',');
      }
      return permits.map((v) => {
        return this.$root.configs.permits.indexOf(v) >= 0;
      }).filter(v => v).length > 0;
    };
    Vue.prototype.$documentTitle = function(title) {
      document.title = title;
      this.$root.title = title;
    };
  }
}
