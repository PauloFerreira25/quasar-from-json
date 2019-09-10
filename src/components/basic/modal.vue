<template>
  <q-dialog v-model="oppened" persistent>
    <q-card style="min-width: 400px">
      <q-card-section v-if="title">
        <div class="text-h6">
          {{ title }}
        </div>
      </q-card-section>

      <q-card-section style="max-height: 50vh" class="scroll">
        <slot name="body" :model="innerModel"></slot>
      </q-card-section>

      <slot name="actions">
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="close" />
          <q-btn color="primary" :label="isEdit ? 'Update' : 'Add'" @click="update" />
        </q-card-actions>
      </slot>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'BasicModal',

  props: {
    model: {
      required: true,
      default: () => {}
    },

    title: {
      type: String,
      required: false,
      default: () => null
    },

    isEdit: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },

  data () {
    return {
      oppened: false,
      innerModel: null
    }
  },

  watch: {
    model: {
      immediate: true,
      handler (val) {
        this.innerModel = JSON.parse(JSON.stringify(val))
      }
    }
  },

  methods: {
    open () {
      this.oppened = true
    },

    close () {
      this.oppened = false
    },

    update () {
      this.$emit('update', this.innerModel)
      this.close()
    }
  }
}
</script>
