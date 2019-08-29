export default {
  findAndSet (path, document, text, setNull = false) {
    let key = path.shift()

    if (!document[key]) {
      if (setNull) {
        document = setNull(document, key, path.length)
      } else {
        document[key] = {}
      }
    }

    if (path.length === 0) {
      document[key] = text
      return null
    }

    return this.findAndSet(path, document[key], text, setNull)
  },
  find (path, document) {
    let key = path.shift()

    if (typeof document[key] === 'undefined') {
      return new Error(`Path not set ${key}`)
    }

    if (path.length === 0) {
      return document[key]
    }

    return this.find(path, document[key])
  }
}
