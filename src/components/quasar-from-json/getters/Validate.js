import GetterFactory from './GetterFactory'

export default class Validate {
  constructor () {
    this.getterFactory = new GetterFactory()
  }

  get (definition, vueInstance) {
    let result = this.getterFactory
      .create('Rules')
      .validateAll() // Específico do rules
    return result
  }
}
