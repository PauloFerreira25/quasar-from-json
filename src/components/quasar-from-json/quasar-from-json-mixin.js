import Validator from 'validatorjs'

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
