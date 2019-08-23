import pathUtils from '../utils/path'

export default class Store {
  get (definition, vueInstance) {
    return definition.type === 'state'
      ? this.__state(definition, vueInstance)
      : val => {
        let config = null
        if (!definition.params) {
          console.warn(`Store getter params undefined - ${definition.params}`)
        } else {
          config = Object.keys(definition.params).reduce((config, key) => {
            config[key] = definition.params[key] !== '$action'
              ? definition.params[key]
              : val

            return config
          }, {})
        }

        this.__callFunction(vueInstance, definition.type, `${definition.path}`, config)
      }
  }

  __callFunction (vueInstance, action, ...args) {
    vueInstance.$store[action](...args)
  }

  __state (definition, vueInstance) {
    return pathUtils.find(definition.path.split('.'), vueInstance.$store[definition.type])
  }
}
