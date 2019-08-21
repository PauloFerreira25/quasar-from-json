import Base from './Base'

export default class I18N extends Base {
  constructor (decorator) {
    super()
    this.decorator = decorator
  }

  mount (config) {
    config = this.decorator.mount(config)

    let text = this.__getText(config.vueInstance)
    this.__setText(config.vueInstance.item.i18n.t.setText.split('.'), config.baseData, text)

    return config
  }

  __getText (vueInstance) {
    return vueInstance.$t(vueInstance.item.i18n.t.getText)
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
