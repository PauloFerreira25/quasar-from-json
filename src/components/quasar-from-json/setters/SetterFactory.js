import textUtils from '../utils/text'

export default class SetterFactory {
  create (setterName) {
    let name = textUtils.capitalizeFirstLetter(setterName)

    let Clss = null
    try {
      Clss = require(`./${name}`)
      Clss = Clss.default
    } catch (err) {
      throw new Error(`No setter for name ${name}`)
    }

    let instance = new Clss()
    return instance
  }
}
