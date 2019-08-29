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

    let result = this.__realTimeEvaluate(definition)

    return result.isRealTime
      ? val => this.__evaluate(result.definition, vueInstance, val)
      : this.__evaluate(definition, vueInstance, {})
  }

  __evaluate (definition, vueInstance, val) {
    console.log({ definition, vueInstance, val })
    if (typeof this[`__${definition.if.is}`] !== 'function') {
      console.warn(`${definition.if.is} inválida`)
      return null
    }

    let eval = this[`__${definition.if.is}`](definition, val)
    if (eval === null) {
      return eval
    }

    let lookfor = eval
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
    let path = definition.if.path.split('.')
    let result = path[0] === '$value'

    if (result) {
      path.shift()
      definition.if.path = path.join('.')
    }

    return {
      isRealTime: result,
      definition
    }
  }

  __boolean (definition, value) {
    let val = pathUtils.find(definition.if.path.split('.'), value)
    if (val instanceof Error) {
      console.warn(`Path ${definition.if.path} not found in ${value}`)
      return null
    }

    return !!val
  }

  __even (definition, value) {
    let val = pathUtils.find(definition.if.path.split('.'), value)
    if (val instanceof Error) {
      console.warn(`Path ${definition.if.path} not found in ${value}`)
      return null
    }

    return !isNaN(val) && val % 2 === 0
  }

  __$return (toBeReturned) {
    return toBeReturned
  }
}
