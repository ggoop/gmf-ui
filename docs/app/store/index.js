
import state from './state'
import mutations from './mutations'
import actions from './actions'



export default {
  state,
  mutations,
  actions,
  strict: process.env.NODE_ENV !== 'production',
  name:"docs"
}
