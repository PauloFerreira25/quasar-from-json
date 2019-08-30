import Vue from 'vue'

import pathUtils from '../utils/path'

export default class Data {
  get (definition, vueInstance) {
    let found = pathUtils.find(definition.path.split('.'), vueInstance.$data)

    if (found instanceof Error) {
      let path = definition.path.split('.')
      let pathSize = path.length
      if (pathSize > 1) {
        pathUtils.findAndSet(path, vueInstance.$data, definition.defaultValue, (obj, key, size) => {
          let val = size === 0
            ? definition.defaultValue
            : {}

          Vue.set(obj, key, val)
          return obj
        })
      } else {
        Vue.set(vueInstance.$data, definition.path, definition.defaultValue)
      }

      found = definition.defaultValue
    }

    console.log({ found })
    return found
  }
}
