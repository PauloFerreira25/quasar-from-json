import BaseDecorator from './decorators/Base'
import I18NDecorator from './decorators/I18N'

export default {
  name: 'DecoratorMixin',

  methods: {
    attributesFactory () {
      let decorators = []
      if (this.item.i18n) {
        decorators.push(I18NDecorator)
      }

      let decorator = decorators.reduce((DecoratorAnterior, Atual) => new Atual(DecoratorAnterior), new BaseDecorator())
      return decorator.mount({
        baseData: {
          key: this.key,
          ref: this.ref,
          props: this.properties,
          atts: this.attrs,
          class: this.class
        },
        vueInstance: this
      })
    }
  }
}
