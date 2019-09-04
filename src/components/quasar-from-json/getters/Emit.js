export default class Emit {
  get (definition, vueInstance) {
    return String(definition.data).includes('$value')
      ? val => this.__emit(definition, vueInstance, val)
      : this.__emit(definition, vueInstance)
  }

  __emit (definition, vueInstance, value) {
    vueInstance.$emit(definition.name, value || definition.data)
  }
}
