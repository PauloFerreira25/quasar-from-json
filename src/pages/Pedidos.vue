<template>
  <q-page class="bg-grey-2 relative-position" padding>
    <div class="full-width column wrap justify-start items-center">
      <div style="width: 50vw">
        <q-toolbar class="text-primary">
          <q-toolbar-title>
            Pedidos
          </q-toolbar-title>
          <q-btn flat round dense icon="add" @click="$router.push('pedido_paulo')" />
        </q-toolbar>

        <basic-grid
          class="fit q-mt-sm"
          :itens="model.pedidos"
          :cols="cols"
          :row-key="'_key'"
          @go="id => $router.push(`/pedido_paulo/${id}`)"
        >
        </basic-grid>
      </div>
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import BasicGrid from '../components/basic/grid'

export default {
  name: 'PedidosPage',

  components: {
    BasicGrid
  },

  data () {
    return {
      step: 1,
      model: {
        pedidos: []
      },
      cols: [
        { align: 'left', label: 'Ref. pedido', field: 'refPedido' },
        { align: 'left', label: 'Status', field: 'pedidoStatus' },
        { align: 'left', label: 'Ação', name: 'route' }
      ],
      loading: false
    }
  },

  methods: {
    async loadData () {
      try {
        this.loading = true
        let response = await this.$axios.get(
          `http://10.129.120.202:3000/79f650f1-8b35-484d-b78c-2f76a66d168e/importacao_pedido`
        )

        this.model.pedidos = response.data.data
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  },

  created () {
    this.loadData()
  }
}
</script>
