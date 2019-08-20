import Vue from 'vue'

import QuasarFromJsonMixin from './quasar-from-json-mixin'
import DecoratorMixin from './qfj-decorator-mixin'

export default Vue.extend({
  name: 'QuasarFromJson',

  mixins: [ QuasarFromJsonMixin, DecoratorMixin ],

  props: {
    item: {
      required: true,
      validator: item => !!item
    }
  },

  render (renderFunction) {
    let childrens = this.item.childrens
      ? this.item.childrens.map(children => renderFunction('QuasarFromJson', { props: { item: children } }))
      : []

    return renderFunction(this.item.type, this.attributesFactory(), childrens)
  }
})
