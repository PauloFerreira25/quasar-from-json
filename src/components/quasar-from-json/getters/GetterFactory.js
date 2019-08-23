import textUtils from '../utils/text'

let instances = []

export default class GetterFactory {
  create (getterName) {
    if (!getterName) {
      console.warn(`Getter name is required!`)
      return
    }

    let name = textUtils.capitalizeFirstLetter(getterName)

    let instance = instances.find(instance => instance.constructor.name === name)
    if (instance) {
      return instance
    }

    let Clss = null
    try {
      Clss = require(`./${name}`)
      Clss = Clss.default
    } catch (err) {
      console.error(err)
      throw new Error(`No getter for name ${name}`)
    }

    instance = new Clss()
    instances.push(instance)

    return instance
  }
}
