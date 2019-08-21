export default class SetterFactory {
  create (setterName) {
    let name = this.__capitalizeFirstLetter(setterName)

    let clss = null
    try {
      clss = require(`./${name}`)
      clss = clss.default
    } catch (err) {
      console.warn(`No setter for name ${name}`, err)
    }

    return clss
  }

  __capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
}
