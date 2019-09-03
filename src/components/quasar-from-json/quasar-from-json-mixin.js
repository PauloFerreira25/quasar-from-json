import Validator from 'validatorjs'

import Decorators from './decorators'
import GetterFactory from './getters/GetterFactory'

export default {
  data () {
    return {
      getterFactory: new GetterFactory()
    }
  },
  methods: {
    render (item) {
      if (!item.render) {
        return true
      }

      return Object.entries(item.render)
        .map(([type, render]) => {
          let value = this.getterFactory.create(type)
            .get(render, this)
          return new Validator({ value }, { value: render.rules.join('|') }).passes()
        })
        .find(f => !!f)
    },

    scopedSlots (renderFunction) {
      return Object.keys(this.slots || {}).reduce((slots, key) => {
        slots[key] = () => this.slots[key].map(child => renderFunction('QuasarFromJson', { props: { item: child } }))
        return slots
      }, {})
    },

    attributesFactory (renderFunction) {
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

      return decorators
        .reduce((DecoratorAnterior, Atual) => new Atual(DecoratorAnterior), new Decorators.Base())
        .mount({
          baseData: {
            key: this.key,
            ref: this.ref,
            domProps: this.domProps,
            props: this.props,
            atts: this.attrs,
            class: this.class,
            style: this.style,
            slot: this.slot,
            scopedSlots: this.scopedSlots(renderFunction)
          },
          vueInstance: this
        }).baseData
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

    style () {
      return this.properties.style
    },

    slot () {
      return this.item.slot
    },

    slots () {
      return this.item.slots
    },

    domProps () {
      return this.properties.domProps
    }
  },

  created () {
    console.log(this.item.beforeRender)
    Object.entries(this.item.beforeRender || {}).map(([type, render]) => {
      let result = this.getterFactory.create(type)
        .get(render, this)
      if (typeof result === 'function') {
        result()
      }
    })
  }
}
