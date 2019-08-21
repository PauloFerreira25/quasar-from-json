export default class GetterFactory {
  create (getterName) {
    let name = this.__capitalizeFirstLetter(getterName)

    let clss = null
    try {
      clss = require(`./${name}`)
      clss = clss.default
    } catch (err) {
      console.warn(`No getter for name ${name}`, err)
    }

    return clss
  }

  __capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
}
