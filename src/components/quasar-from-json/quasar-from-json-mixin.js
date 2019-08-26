import Validator from 'validatorjs'

import Decorators from './decorators'
import GetterFactory from './getters/GetterFactory'

export default {
  methods: {
    render () {
      if (!this.item.render) {
        return true
      }

      let getterFactory = new GetterFactory()
      return Object.entries(this.item.render)
        .map(([type, render]) => {
          let value = getterFactory.create(type)
            .get(render, this)
          return new Validator({ value }, { value: render.rules.join('|') }).passes()
        })
        .find(f => !!f)
    },

    register () {
      let mutation = new GetterFactory().getterFactory
        .create('store')
        .get({
          type: 'commit',
          path: 'global/addRef',
          params: this.ref
        }, this)
      mutation()
    },

    attributesFactory () {
      let decorators = []
      if (Array.isArray(this.item.set) && this.item.set.length > 0) {
        decorators.push(Decorators.Setter)
      }

      if (Array.isArray(this.item.rebind) && this.item.rebind.length > 0) {
        decorators.push(Decorators.Binder)
      }

      if (this.item.events) {
        decorators.push(Decorators.Event)
      }

      let data = decorators
        .reduce((DecoratorAnterior, Atual) => new Atual(DecoratorAnterior), new Decorators.Base())
        .mount({
          baseData: {
            key: this.key,
            ref: this.ref,
            domProps: this.domProps,
            props: this.props,
            atts: this.attrs,
            class: this.class
          },
          vueInstance: this
        }).baseData

      // this.register()
      return data
    }
  },

  computed: {
    key () {
      return this.item.key
    },

    ref () {
      return this.item.ref
    },

    properties () {
      return this.item.properties || {}
    },

    props () {
      return this.properties.props || {}
    },

    attrs () {
      return this.properties.attrs || {}
    },

    class () {
      return this.properties.class
    },

    domProps () {
      return this.properties.domProps
    },

    validate () {
      return Array.isArray(this.item.validate)
        ? this.item.validate
        : [ this.item.validate ]
    }
  }
}
