/* Third Party */
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import app from 'gmf/app'
import component from 'gmf/component-all'
import { routes } from './routes'
import i18nLocales from './i18n'

/* App */
import AppRoot from './App'
import store from './store'
import './components'

Vue.config.productionTip = false
app.use(component);

const mappedRoutes = routes.map(route => ({
  ...route,
  component: () => import(`./pages/${route.page}`)
}))

app.route(mappedRoutes);
app.store(store);
app.i18n('enUS','',i18nLocales.enUS);

app.run({elID:'#docs',app:AppRoot,locale:'enUS'});