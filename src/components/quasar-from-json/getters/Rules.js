import Validator from 'validatorjs'

import GetterFactory from './GetterFactory'

export default class Rules {
  constructor () {
    this.getterFactory = new GetterFactory()
    this.components = []
  }

  get (definition, vueInstance) {
    vueInstance.$refs = new Proxy(vueInstance.$refs, {
      set: (obj, prop, value) => {
        this.__clean()

        if (value) {
          let index = this.components.findIndex(ref => ref.$vnode.data.ref === vueInstance.item.ref)
          if (index !== -1) {
            this.components[index] = value
          } else if (prop === vueInstance.item.ref) {
            this.components.push(value)
          }
        }

        obj[prop] = value
        return true
      }
    })

    return [
      val => {
        let and = this.__testInput(definition.validations.and.join('|'), val)
        let or = definition.validations.or
          ? this.__testInput(definition.validations.or.join('|'), val)
          : and

        let messageHandler = Object.keys(definition.message)[0] // Pega só o primeiro
        let msg = this.getterFactory
          .create(messageHandler)
          .get(definition.message[messageHandler], vueInstance)

        return (and || or) || msg
      }
    ]
  }

  validateAll () {
    return !this.components.map(c => {
      if (typeof c.validate === 'function') {
        c.validate()
      }
      return c.hasError
    }).find(f => f)
  }

  __testInput (validations, input) {
    if (input && !isNaN(input)) {
      input = Number(input)
    }

    let validator = new Validator({ input }, { input: validations })
    return validator.passes()
  }

  __clean () {
    this.components = this.components.filter(ref => ref && ref.$vnode && !ref._isDestroyed)
  }
}
