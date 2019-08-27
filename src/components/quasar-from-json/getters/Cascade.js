import GetterFactory from './GetterFactory'

export default class Cascade {
  constructor () {
    this.getterFactory = new GetterFactory()
  }

  get (definition, vueInstance) {
    if (!definition) {
      return
    }

    return () => definition.reduce(async (anterior, atual) => {
      let result = await anterior

      if (result === null && !atual.execOnError) {
        return result
      }

      let getter = this.getterFactory
        .create(atual.type)
        .get(atual.config, vueInstance)

      return typeof getter === 'function'
        ? atual.lastValue
          ? getter(result)
          : getter()
        : getter
    }, () => true)
  }
}
