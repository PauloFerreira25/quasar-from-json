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
    if (!found) {
      throw new Error(`No getter for ${definition.getter}`)
    }

    let text = this.getterFactory.create(found.type)
      .get(found, config.vueInstance)

    pathUtils.findAndSet(definition.path.split('.'), config.baseData, text)
  }
}
