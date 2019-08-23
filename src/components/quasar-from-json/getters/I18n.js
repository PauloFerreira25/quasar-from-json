import GetterFactory from './GetterFactory'

export default class I18n {
  constructor () {
    this.getterFactory = new GetterFactory()
  }

  get (definition, vueInstance) {
    let path = definition.path
    if (typeof path !== 'string') {
      let key = Object.keys(path)[0]
      path = this.getterFactory.create(key)
        .get(path[key], vueInstance)
    }

    return vueInstance.$t(path)
  }
}
