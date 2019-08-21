module.exports = {
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
  }
}
