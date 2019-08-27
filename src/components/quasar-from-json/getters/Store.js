import pathUtils from '../utils/path'

export default class Store {
  get (definition, vueInstance) {
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
    return pathUtils.find(definition.path.split('.'), vueInstance.$store.state)
  }

  __mountConfig (params, val) {
    let config = null
    if (Array.isArray(params)) {
      config = params
    } else if (typeof params !== 'object') {
      config = params
    } else {
      config = Object.keys(params).reduce((config, key) => {
        config[key] = params[key] !== '$action'
          ? params[key]
          : val

        return config
      }, {})
    }

    return config
  }
}
