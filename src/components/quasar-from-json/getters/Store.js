import Vue from 'vue'
import axios from 'axios'

import pathUtils from '../utils/path'

export default class Store {
  get (definition, vueInstance) {
    this.__checkStoreState(definition, vueInstance)

    return !definition.type || definition.type === 'state'
      ? this.__state(definition, vueInstance)
      : val => {
        return this.__callFunction(
          vueInstance,
          definition.type,
          `${definition.path}`,
          this.__mountConfig(definition.params, val)
        )
      }
  }

  __callFunction (vueInstance, action, ...args) {
    return vueInstance.$store[action](...args)
  }

  __state (definition, vueInstance) {
    let path = JSON.parse(JSON.stringify(definition.path.split('.')))
    let found = pathUtils.find(path, vueInstance.$store.state)

    if (found instanceof Error) {
      let state = JSON.parse(JSON.stringify(definition.path.split('.')))

      this.__callFunction(vueInstance, 'commit', `${state.shift()}/changeState`, {
        state: state.join('.'),
        value: typeof definition.defaultValue !== 'undefined'
          ? definition.defaultValue
          : ''
      })

      found = this.__state(definition, vueInstance)
    }

    return found
  }

  __mountConfig (params, val) {
    let config = null
    if (Array.isArray(params)) {
      config = params
    } else if (typeof params !== 'object') {
      config = params
    } else {
      config = Object.keys(params).reduce((config, key) => {
        if (String(params[key]).includes('$value')) {
          config.originalPath = params[key]
          config[key] = val
        } else {
          config[key] = params[key]
        }

        return config
      }, {})
    }

    return config
  }

  // Registrando módulos da store dinamicamente
  __checkStoreState (definition, vueInstance) {
    let state = definition.path.split('.').length > 1
      // state vem delimitado por ponto
      ? definition.path.split('.')[0]
      // actions vem delimitado por barra
      : definition.path.split('/')[0]

    // Módulo já existe
    if (vueInstance.$store.state[state]) {
      return
    }

    vueInstance.$store.registerModule(state, {
      // Default vuex module
      namespaced: true,
      state: {},

      actions: {
        callBackend: async (context, params) => {
          try {
            let response = await axios(params)
            return response.data
          } catch (err) {
            throw err
          }
        }
      },

      mutations: {
        changeState: (state, data) => {
          let path = data.state.split('.')
          let toBeSet = null

          if (data.originalPath) {
            let originalPath = JSON.parse(JSON.stringify(data.originalPath)).split('.')
            originalPath.shift()

            toBeSet = originalPath.length > 0
              ? pathUtils.find(originalPath, data.value)
              : data.value
          } else {
            toBeSet = data.value
          }

          let pathSize = path.length
          if (pathSize > 1) {
            pathUtils.findAndSet(path, state, toBeSet, (obj, key, size) => {
              let val = size === 0
                ? data.value
                : {}

              Vue.set(obj, key, val)
              return obj
            })
          } else {
            Vue.set(state, data.state, toBeSet)
          }
        }
      }
    })
  }
}
