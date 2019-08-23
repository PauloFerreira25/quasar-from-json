import Validator from 'validatorjs'

import GetterFactory from './GetterFactory'

export default class Validate {
  constructor () {
    this.getterFactory = new GetterFactory()
  }

  get (definition, vueInstance) {
    return Object.entries(definition).map(([key, val]) => {
      let toBeValidated = this.getterFactory
        .create(key)
        .get(val, vueInstance)

      let result = new Validator({
        toBeValidated
      }, {
        toBeValidated: (val.validations || []).join('|')
      })

      return result.passes()
    }).find(f => !!f)
  }
}
