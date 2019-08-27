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
        if (prop === vueInstance.item.ref) {
          this.components.push(value)
        }

        obj[prop] = value
        return true
      }
    })

    return definition.validations.map(validation =>
      val => {
        if (val && !isNaN(val)) {
          val = Number(val)
        }

        let validator = new Validator({ val }, { val: validation })
        let messageHandler = Object.keys(definition.message)[0] // Pega só o primeiro
        return validator.passes() || this.getterFactory.create(messageHandler)
          .get(definition.message[messageHandler], vueInstance)
      }
    )
  }

  validateAll () {
    return !this.components.map(c => {
      if (typeof c.validate === 'function') {
        c.validate()
      }
      return c.hasError
    }).find(f => !f)
  }
}
