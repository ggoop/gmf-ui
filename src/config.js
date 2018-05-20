import Vue from 'vue';
import snakeCase from 'gmf/core/utils/MdSnakeCase';
import isArray from 'lodash/isArray'
import startsWith from 'lodash/startsWith';
const wrapApp = {
  template: '<md-wrap :name="wrap"></md-wrap>',
  computed: {
    wrap: function() {
      return this.$route.params.app;
    }
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  }
};
const wrapModule = {
  template: '<md-wrap :name="wrap"></md-wrap>',
  computed: {
    wrap: function() {
      const app = snakeCase(this.$route.params.app);
      const module = snakeCase(this.$route.params.module);
      if (!startsWith(module, app) && module.indexOf('-') < 0) {
        return app + '-' + module;
      }
      return module;
    }
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  }
};
const wrapExtend = {
  template: '<md-wrap :name="wrap"></md-wrap>',
  computed: {
    wrap: function() {
      const app = snakeCase(this.$route.params.app);
      const module = snakeCase(this.$route.params.module);
      if (!startsWith(module, app) && module.indexOf('-') < 0) {
        return app + '-' + module;
      }
      return module;
    }
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  }
};
const defaultRoutes = [{
  path: '/:app',
  component: wrapApp,
  name: 'app',
  children: [{
    path: ':module',
    name: 'module',
    component: wrapModule,
    children: [
      { path: ':id', name: 'id', component: wrapExtend },
      { path: '*', component: wrapExtend }
    ]
  }]
}];

class gmfConfig {
  constructor() {
    this.routes = [];
    this.stores=[];
    this.defaultRoutes = defaultRoutes;
  }
  route(routes) {
    if (isArray(routes)) {
      routes.forEach((item) => {
        this.routes.push(item);
      });
    } else {
      this.routes.push(routes);
    }
  }
  store(store){
    if(!store.name)return;
    this.stores.push(store);
  }
}

if (!Vue.gmfConfig) {
  Vue.gmfConfig = new gmfConfig()
  Vue.prototype.$gmfConfig = Vue.gmfConfig;
}
const config = Vue.gmfConfig;
export default config;
