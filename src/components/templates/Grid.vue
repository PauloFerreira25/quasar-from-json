<template>
  <q-table
    :title="title"
    :data="data"
    :columns="cols"
    :row-key="rowKey"
  >
    <template #body="props">
      <q-tr :props="props">
        <q-td
          v-for="col in cols"
          :key="col.field"
          :props="props"
          style="min-width: 200px"
        >
          <slot
            :grid="{ index: props.row.__index, field: col.field, from }"
            :name="col.field"
          >
          </slot>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
export default {
  name: 'GridTemplate',
  props: {
    title: {
      type: String,
      required: false,
      default: () => ''
    },
    data: {
      type: Array,
      required: true
    },
    cols: {
      type: Array,
      required: true
    },
    rowKey: {
      type: String,
      required: false,
      default: () => '_id'
    },
    from: {
      type: Object,
      required: true
    }
  },
  methods: {
    tab (val) {
      // TODO: implementar action que vá para o próximo q-poopup-edit
      console.log({ val })
    }
  }
}
</script>
