import textUtils from '../utils/text'

export default class SetterFactory {
  create (setterName) {
    let name = textUtils.capitalizeFirstLetter(setterName)

    let clss = null
    try {
      clss = require(`./${name}`)
      clss = clss.default
    } catch (err) {
      throw new Error(`No setter for name ${name}`)
    }

    return clss
  }
}
