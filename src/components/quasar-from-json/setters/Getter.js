import GetterFactory from '../getters/GetterFactory'

export default class Getter {
  constructor () {
    this.getterFactory = new GetterFactory()
  }

  set (definition, config) {
    if (!Array.isArray(config.vueInstance.item.get)) {
      console.warn(`Getter ${definition.ref} não especificado!`)
      return null
    }

    let found = config.vueInstance.item.get.find(getter => getter.ref === definition.getter)
    let Getter = this.getterFactory.create(found.type)
    let text = new Getter().get(found, config.vueInstance)

    this.__setText(definition.path.split('.'), config.baseData, text)
  }

  __setText (path, document, text) {
    let key = path.shift()

    if (!document[key]) {
      document[key] = {}
    }

    if (path.length === 0) {
      document[key] = text
      return null
    }

    return this.__setText(path, document[key], text)
  }
}
