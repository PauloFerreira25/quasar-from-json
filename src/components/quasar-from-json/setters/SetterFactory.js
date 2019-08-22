import textUtils from '../utils/text'

let instances = []

export default class SetterFactory {
  create (setterName) {
    let name = textUtils.capitalizeFirstLetter(setterName)

    let instance = instances.find(instance => instance.constructor.name === name)
    if (instance) {
      return instance
    }

    let Clss = null
    try {
      Clss = require(`./${name}`)
      Clss = Clss.default
    } catch (err) {
      throw new Error(`No setter for name ${name}`)
    }

    instance = new Clss()
    instances.push(instance)
    return instance
  }
}
