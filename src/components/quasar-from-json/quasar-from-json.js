import Vue from 'vue'

import QuasarFromJsonMixin from './quasar-from-json-mixin'

export default Vue.extend({
  name: 'QuasarFromJson',

  mixins: [ QuasarFromJsonMixin ],

  props: {
    item: {
      required: true,
      validator: item => !!item
    }
  },

  render (renderFunction) {
    let childrens = this.item.childrens
      ? this.item.childrens
        .filter(this.render)
        .map(children => renderFunction('QuasarFromJson', { props: { item: children } }))
      : this.$slots

    return renderFunction(this.item.type, this.attributesFactory(renderFunction), childrens)
  }
})
