<template>
  <q-dialog v-model="oppened" persistent>
    <q-card style="min-width: 400px">
      <q-card-section v-if="title">
        <div class="text-h6">
          {{ title }}
        </div>
      </q-card-section>

      <q-card-section>
        <slot name="body">
        </slot>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" @click="close" />
        <q-btn color="primary" label="Add" @click="add" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'BasicModal',

  props: {
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
      oppened: false
    }
  },

  methods: {
    open () {
      this.oppened = true
    },

    close () {
      this.$emit('closing')
      this.oppened = false
    },

    add () {
      if (!this.isEdit) {
        this.$emit('add')
      }
      this.close()
    }
  }
}
</script>
