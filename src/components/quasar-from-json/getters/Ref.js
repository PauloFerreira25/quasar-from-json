import SetterFactory from '../setters/SetterFactory'

export default class Ref {
  constructor () {
    this.setterFactory = new SetterFactory()
  }

  get (definition, vueInstance) {
    return () => {
      let references = this.setterFactory
        .create('ref')
        .getReferences()

      let found = references.find(ref => ref.$vnode.data.ref === definition.on)
      if (typeof found[definition.action] === 'function') {
        found[definition.action]()
      }
    }
  }
}
