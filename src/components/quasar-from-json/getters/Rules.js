import Validator from 'validatorjs'

import GetterFactory from './GetterFactory'

export default class Rules {
  constructor () {
    this.getterFactory = new GetterFactory()
  }

  get (definition, vueInstance) {
    return definition.validations.map(validation =>
      val => {
        let validator = new Validator({ val }, { val: validation })
        let messageHandler = Object.keys(definition.message)[0] // Pega só o primeiro
        return validator.passes() || this.getterFactory.create(messageHandler)
          .get(definition.message[messageHandler], vueInstance)
      }
    )
  }
}
