import Base from './Base'

export default class I18N extends Base {
  constructor (decorator) {
    super()
    this.decorator = decorator
  }

  mount (config) {
    let data = this.decorator.mount(config)

    let text = this.__getText(config.vueInstance, config.item.i18n.t.getText)
    this.__setText(config.item.i18n.t.setText.split('.'), config.baseData, text)

    return data
  }

  __getText (vueInstance, path) {
    return vueInstance.$t(path)
  }

  __setText (path, document, text) {
    let key = path.shift()

    if (!document[key]) {
      document[key] = {}
    }

    if (path.length === 0) {
      document[key] = text
      return
    }

    return this.__setText(path, document[key], text)
  }
}
