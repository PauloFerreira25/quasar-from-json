import SetterFactory from '../setters/SetterFactory'

export default class BaseDecorator {
  constructor () {
    this.setterFactory = new SetterFactory()
  }

  mount (config) {
    // Criando um objeto de referencias
    this.setterFactory
      .create('ref')
      .set(null, config)
    return config
  }
}
