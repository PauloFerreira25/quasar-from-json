import GetterFactory from './GetterFactory'
import pathUtils from '../utils/path'

export default class Conditional {
  constructor () {
    this.getterFactory = new GetterFactory()
  }

  get (definition, vueInstance) {
    if (!definition.if) {
      console.warn(`Condicional definida sem o if`)
      return () => null
    }

    if (!definition.then) {
      console.warn(`Condicional definida sem o then`)
      return () => null
    }

    return this.__realTimeEvaluate(definition.if)
      ? val => this.__evaluate(definition, vueInstance, val)
      : this.__evaluate(definition, vueInstance, {})
  }

  __evaluate (definition, vueInstance, val) {
    console.log({ definition, vueInstance, val })
    if (typeof this[`__${definition.if.is}`] !== 'function') {
      console.warn(`${definition.if.is} inválida`)
      return null
    }

    let lookfor = this[`__${definition.if.is}`](definition, val)
      ? 'then'
      : 'else'

    let tFunc = Object.keys(definition[lookfor])[0]
    if (typeof this[`__${tFunc}`] !== 'function') {
      console.warn(`${tFunc} não definida`)
      return null
    }

    return this[`__${tFunc}`](definition[lookfor][tFunc], val)
  }

  __realTimeEvaluate (definition) {
    return definition.path.split('.')[0] !== '$value'
  }

  __boolean (definition, value) {
    return !!pathUtils.find(definition.if.path.split('.'), value)
  }

  __even (definition, value) {
    let val = pathUtils.find(definition.if.path.split('.'), value)
    return !isNaN(val) && val % 2 === 0
  }

  __$return (toBeReturned) {
    return toBeReturned
  }
}
