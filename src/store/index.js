import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import page from './page'
import doc from './doc'
import user from './user'
import global from './global'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      page,
      doc,
      user,
      global
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
