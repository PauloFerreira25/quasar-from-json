import pathUtils from '../utils/path'

export default class Raw {
  set (definition, config) {
    pathUtils.findAndSet(definition.path.split('.'), config.baseData, definition.data)
  }
}
