import GetterFactory from '../getters/GetterFactory'
import pathUtils from '../utils/path'

export default class Get {
  constructor () {
    this.getterFactory = new GetterFactory()
  }

  set (from, definition, path, config) {
    let text = this.getterFactory.create(from)
      .get(definition, config.vueInstance)
    pathUtils.findAndSet(path.split('.'), config.baseData, text)
  }
}
