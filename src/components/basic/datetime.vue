<template>
  <q-input
    outlined
    :label="label"
    :rules="rules"
    v-model="model"
    :readonly="readonly"
    :lazy-rules="lazyRules"
  >
    <template
      #append
    >
      <q-icon
        v-if="date"
        name="event"
        class="cursor-pointer q-ml-md"
      >
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date v-model="model" :mask="mask" />
        </q-popup-proxy>
      </q-icon>

      <q-icon
        v-if="time"
        name="access_time"
        class="cursor-pointer"
      >
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time v-model="model" :mask="mask" format24h />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'BasicQuasarDatetime',
  props: {
    value: {
      required: true
    },
    date: {
      type: Boolean,
      required: false,
      default: () => true
    },
    time: {
      type: Boolean,
      required: false,
      default: () => true
    },
    mask: {
      type: String,
      required: false,
      default: () => 'DD-MM-YYYY HH:mm:ss'
    },
    label: {
      type: String,
      required: true
    },
    readonly: {
      type: Boolean,
      required: false,
      default: () => false
    },
    rules: {
      type: Array,
      required: false,
      default: () => []
    },
    lazyRules: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      model: ''
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.model = val
      }
    },
    model (val) {
      this.$emit('input', val)
    }
  }
}
</script>
