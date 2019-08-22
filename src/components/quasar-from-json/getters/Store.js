import pathUtils from '../utils/path'

export default class Store {
  get (definition, vueInstance) {
    return pathUtils.find(definition.path.split('.'), vueInstance.$store[definition.type])
  }
}
