import GetterFactory from './GetterFactory'
import pathUtils from '../utils/path'

export default class Conditional {
  constructor () {
    this.getterFactory = new GetterFactory()
  }

  get (definition, vueInstance) {
    if (!definition.if) {
      console.warn(`Condicional definida sem o if`)
      return () => false
    }

    if (!definition.then) {
      console.warn(`Condicional definida sem o then`)
      return () => false
    }

    return val => {
      if (typeof this[`__${definition.if.is}`] !== 'function') {
        console.warn(`${definition.if.is} inválida`)
        return null
      }

      let fResult = this[`__${definition.if.is}`](definition, val)
      console.log('fResult', fResult)

      if (fResult) {

      }

      let lookfor = fResult
        ? 'then'
        : 'else'
      let tFunc = Object.keys(definition[lookfor])[0]

      if (typeof this[`__${tFunc}`] !== 'function') {
        console.warn(`${tFunc} não definida`)
        return null
      }

      return this[`__${tFunc}`](definition[lookfor][tFunc], val)
    }
  }

  __even (definition, value) {
    let val = pathUtils.find(definition.if.path.split('.'), value)
    console.log('Val found', val)
    return !isNaN(val) && val % 2 === 0
  }

  __$return (toBeReturned) {
    return toBeReturned
  }
}
