import textUtils from '../utils/text'

export default class GetterFactory {
  create (getterName) {
    let name = textUtils.capitalizeFirstLetter(getterName)

    let clss = null
    try {
      clss = require(`./${name}`)
      clss = clss.default
    } catch (err) {
      console.error(err)
      throw new Error(`No getter for name ${name}`)
    }

    return clss
  }
}
