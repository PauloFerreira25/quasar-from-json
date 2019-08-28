export default class Ref {
  constructor () {
    this.references = []
  }

  set (definition, config) {
    config.vueInstance.$refs = new Proxy(config.vueInstance.$refs, {
      set: (obj, prop, value) => {
        this.__cleanRefs()

        if (value) {
          let index = this.references.findIndex(ref => ref.$vnode.data.ref === config.vueInstance.item.ref)
          if (index !== -1) {
            this.references[index] = value
          } else if (prop === config.vueInstance.item.ref) {
            this.references.push(value)
          }
        }

        obj[prop] = value
        return true
      }
    })
  }

  getReferences () {
    return this.references
  }

  __cleanRefs () {
    this.references = this.references.filter(ref => ref && ref.$vnode && !ref._isDestroyed)
  }
}
