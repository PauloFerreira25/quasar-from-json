import pathUtils from '../utils/path'

export default class Raw {
  get (definition) {
    if (String(definition.path).includes('$value')) {
      return val => {
        let path = definition.path.split('.')
        path.shift()

        let found = pathUtils.find(path, val)
        if (found instanceof Error) {
          found = ''
        }

        return found
      }
    }

    return definition.path
  }
}
