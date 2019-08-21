export default class I18n {
  get (definition, vueInstance) {
    return vueInstance.$t(definition.path)
  }
}
