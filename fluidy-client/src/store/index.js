  
import Vue from 'vue'
import Vuex from 'vuex'
import tree from './modules/static/tree'
import currentContents from './modules/static/currentContents'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
console.log(debug)
export default new Vuex.Store({
  modules: {
    tree,
    currentContents
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})