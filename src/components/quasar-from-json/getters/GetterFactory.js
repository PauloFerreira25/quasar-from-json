import textUtils from '../utils/text'

export default class GetterFactory {
  create (getterName) {
    let name = textUtils.capitalizeFirstLetter(getterName)

    let Clss = null
    try {
      Clss = require(`./${name}`)
      Clss = Clss.default
    } catch (err) {
      console.error(err)
      throw new Error(`No getter for name ${name}`)
    }

    let instance = new Clss()
    return instance
  }
}
