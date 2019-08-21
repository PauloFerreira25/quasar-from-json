export default {
  findAndSet (path, document, text) {
    let key = path.shift()

    if (!document[key]) {
      document[key] = {}
    }

    if (path.length === 0) {
      document[key] = text
      return null
    }

    return this.findAndSet(path, document[key], text)
  },
  find (path, document) {
    let key = path.shift()

    if (path.length === 0) {
      return document[key]
    }

    return this.find(path, document[key])
  }
}
