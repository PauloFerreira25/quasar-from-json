import pathUtils from '../utils/path'

export default class Store {
  get (definition, vueInstance) {
    return this[`__${definition.type}`](definition, vueInstance)
  }

  __callFunction (vueInstance, action, ...args) {
    vueInstance.$store[action](...args)
  }

  __commit (definition, vueInstance) {
    return val => {
      let config = Object.keys(definition.params).reduce((config, key) => {
        config[key] = definition.config[key] !== '$action'
          ? definition.config[key]
          : val

        return config
      }, {})

      this.__callFunction(vueInstance, 'commit', `${definition.module}/${definition.to}`, config)
    }
  }

  __dispatch (definition, vueInstance) {
    return val => {
      let parts = definition.path.split('.')
      vueInstance.$store.commit(`${parts.shift()}/${definition.to}`, {
        state: parts.shift(),
        value: val
      })
    }
  }

  __state (definition, vueInstance) {
    return pathUtils.find(definition.path.split('.'), vueInstance.$store[definition.type])
  }
}
