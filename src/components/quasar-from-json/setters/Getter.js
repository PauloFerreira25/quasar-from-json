import GetterFactory from '../getters/GetterFactory'
import pathUtils from '../utils/path'

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

    pathUtils.findAndSet(definition.path.split('.'), config.baseData, text)
  }
}
