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
    if (typeof this[`__${definition.if.is}`] !== 'function') {
      console.warn(`${definition.if.is} inválida`)
      return null
    }

    let evaluated = this[`__${definition.if.is}`](definition, val)
    if (evaluated === null) {
      return evaluated
    }

    let lookfor = evaluated
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
    let definitionClone = JSON.parse(JSON.stringify(definition))

    let path = definitionClone.if.path.split('.')
    let result = path[0] === '$value'

    if (result) {
      path.shift()
      definitionClone.if.path = path.join('.')
    }

    return {
      isRealTime: result,
      definition: definitionClone
    }
  }

  __findPath (path, value) {
    if (!path) {
      return value
    }

    let val = pathUtils.find(path.split('.'), value)

    if (val instanceof Error) {
      throw new Error(`Path ${path} not found in ${value}`)
    }

    return val
  }

  __boolean (definition, value) {
    try {
      let val = this.__findPath(definition.if.path, value)
      return !!val
    } catch (err) {
      console.warn(err)
      return null
    }
  }

  __even (definition, value) {
    try {
      let val = this.__findPath(definition.if.path, value)
      return !isNaN(val) && val % 2 === 0
    } catch (err) {
      console.warn(err)
      return null
    }
  }

  __eq (definition, value) {
    try {
      let val = this.__findPath(definition.if.path, value)
      return val === definition.if.to
    } catch (err) {
      console.warn(err)
      return null
    }
  }

  __$return (toBeReturned) {
    return toBeReturned
  }
}
