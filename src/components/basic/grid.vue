<template>
  <q-table
    :title="title"
    :data="data"
    :columns="cols"
    :row-key="rowKey"
    hide-bottom
    flat
    bordered
  >
    <template #body-cell-acoes="props">
      <q-td>
        <q-btn
          flat
          dense
          round
          color="primary"
          icon="edit"
          @click="$emit('edit', props.row[rowKey])"
        />

        <q-btn
          flat
          dense
          round
          color="negative"
          icon="delete"
          @click="$emit('delete', props.row[rowKey])"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script>
export default {
  name: 'BasicGrid',
  props: {
    title: {
      type: String,
      required: false,
      default: () => ''
    },
    itens: {
      type: Array,
      required: true,
      default: () => []
    },
    cols: {
      type: Array,
      required: true,
      default: () => []
    },
    rowKey: {
      type: String,
      required: false,
      default: () => '__index'
    }
  },
  data () {
    return {
      data: []
    }
  },
  watch: {
    itens: {
      deep: true,
      handler (val) {
        this.data = val
      }
    }
  }
}
</script>
