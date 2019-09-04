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
        >
          {{ props.row[col.field] }}
          <q-popup-edit :value="props.row[col.field]" @save="() => void 0" @cancel="() => void 0">
            <slot :grid="{ index: props.row.__index, field: col.field, from }" :name="col.field"></slot>
          </q-popup-edit>
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
  }
}
</script>
