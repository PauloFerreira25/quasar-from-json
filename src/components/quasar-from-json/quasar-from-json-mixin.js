export default {
  methods: {
    checkValidate (e, val) {}
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

    class () {
      return this.properties.class
    },

    validate () {
      return Array.isArray(this.item.validate)
        ? this.item.validate
        : [ this.item.validate ]
    }
  }
}