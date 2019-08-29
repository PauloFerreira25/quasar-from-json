import GetterFactory from './GetterFactory'

export default class Validate {
  constructor () {
    this.getterFactory = new GetterFactory()
  }

  get (definition, vueInstance) {
    let result = this.getterFactory
      .create('Rules')
      .validate((definition || {}).refs) // Específico do rules
    return result || null
  }
}
