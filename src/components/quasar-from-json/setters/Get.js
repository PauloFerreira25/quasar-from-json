import GetterFactory from '../getters/GetterFactory'
import pathUtils from '../utils/path'

export default class Get {
  constructor () {
    this.getterFactory = new GetterFactory()
  }

  set (definition, config) {
    let text = this.getterFactory.create(definition.get.from)
      .get(definition.get.config, config.vueInstance)

    pathUtils.findAndSet(definition.set.split('.'), config.baseData, text)
  }
}
