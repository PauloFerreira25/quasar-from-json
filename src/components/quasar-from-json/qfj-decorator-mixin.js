import Decorators from './decorators'

export default {
  name: 'DecoratorMixin',

  methods: {
    attributesFactory () {
      let decorators = []
      if (Array.isArray(this.item.set) && this.item.set.length > 0) {
        decorators.push(Decorators.Setter)
      }

      let decorator = decorators.reduce((DecoratorAnterior, Atual) => new Atual(DecoratorAnterior), new Decorators.Base())
      return decorator.mount({
        baseData: {
          key: this.key,
          ref: this.ref,
          props: this.props,
          atts: this.attrs,
          class: this.class
        },
        vueInstance: this
      }).baseData
    }
  }
}
