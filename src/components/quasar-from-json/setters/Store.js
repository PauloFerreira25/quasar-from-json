import pathUtils from '../utils/path'

export default class Store {
  set (definition, config) {
    pathUtils.findAndSet(definition.path.split('.'), config.baseData, val => {
      let parts = definition.state.split('.')
      let store = parts[0]
      config.vueInstance.$store.commit(`${store}/changeState`, {
        state: parts[1],
        value: val
      })
    })
  }
}
