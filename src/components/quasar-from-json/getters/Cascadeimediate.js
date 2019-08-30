import GetterFactory from './GetterFactory'

export default class CascadeImediate {
  constructor () {
    this.getterFactory = new GetterFactory()
  }

  get (definition, vueInstance) {
    if (!definition) {
      return
    }
    return this.__cascade(definition, vueInstance)
  }

  __cascade (actions, vueInstance) {
    return actions.reduce((anterior, atual) => {
      if (anterior === null && !atual.execOnError) {
        return anterior
      }

      let getter = this.getterFactory
        .create(atual.type)
        .get(atual.config, vueInstance)

      try {
        let result = typeof getter === 'function'
          ? atual.lastValue
            ? getter(anterior)
            : getter()
          : getter

        return result
      } catch (error) {
        return console.warn(`Ação do cascade jogou exception ${error}`)
      }
    }, true)
  }
}
