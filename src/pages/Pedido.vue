<template>
  <q-page class="bg-grey-2" padding>
    <div class="full-width column wrap justify-start items-center">
      <div style="width: 50vw">
        <div class="text-h4 text-primary">
          Importação - Pedido
        </div>

        <q-stepper
          v-model="step"
          header-nav
          ref="stepper"
          color="primary"
          class="q-mt-md"
          animated
        >
          <q-step
            :name="1"
            :title="$t('pedido.step.capa')"
            icon="list"
            :done="step > 1"
          >
            <div class="row q-gutter-md">
              <q-input
                outlined
                v-model="model.refPedido"
                :label="$t('pedido.refPedido')"
                class="col"
                style="border-color: 2px black"
              />

              <q-input
                outlined
                v-model="model.pedidoCliente"
                :label="$t('pedido.pedidoCliente')"
                class="col"
              />
            </div>

            <div class="row q-gutter-md q-mt-sm">
              <basic-datetime
                v-model="model.dataAberturaPO"
                :label="$t('pedido.dataAberturaPO')"
                class="col"
              />

              <basic-datetime
                v-model="model.dataPedido"
                :label="$t('pedido.dataPedido')"
                class="col"
              />

              <q-select
                outlined
                map-options
                emit-value
                v-model="model.pedidoStatus"
                :options="pedidoStatusOpts"
                :label="$t('pedido.pedidoStatus')"
                class="col"
              />
            </div>

            <div class="row q-gutter-md q-mt-sm">
              <q-select
                outlined
                use-input
                hide-selected
                fill-input
                input-debounce="500"
                v-model="model.importador"
                :options="importadorOpts"
                :label="$t('pedido.importador')"
                option-label="name"
                option-value="_key"
                class="col"
                @filter="filterImportador"
              >
                <template #no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                outlined
                use-input
                hide-selected
                fill-input
                input-debounce="500"
                v-model="model.adquirente"
                :options="adquirenteOpts"
                :label="$t('pedido.adquirente')"
                option-label="name"
                option-value="_key"
                class="col"
                @filter="filterAdquirente"
              >
                <template #no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <div class="row q-gutter-md q-mt-sm">
              <q-input
                outlined
                readonly
                v-model="model.exportador"
                :label="$t('pedido.exportador')"
                class="col"
              />

              <q-select
                outlined
                use-input
                hide-selected
                fill-input
                input-debounce="500"
                v-model="model.comprador"
                :options="compradorOpts"
                :label="$t('pedido.comprador')"
                option-label="name"
                option-value="_key"
                class="col"
                @filter="filterComprador"
              >
                <template #no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <div class="row q-gutter-md q-mt-sm">
              <q-input
                outlined
                readonly
                v-model="model.moedaPedido"
                :label="$t('pedido.moedaPedido')"
                class="col"
              />

              <q-select
                outlined
                v-model="model.tipoPreco"
                :options="pedidoStatusOpts"
                :label="$t('pedido.tipoPreco')"
                class="col"
              />

              <q-input
                readonly
                outlined
                v-model="model.valorPedido"
                :label="$t('pedido.valorPedido')"
                class="col"
              />
            </div>

            <div class="row q-gutter-md q-mt-sm">
              <q-input
                outlined
                type="textarea"
                v-model="model.instrucoes"
                :label="$t('pedido.instrucoes')"
                class="col"
              />
            </div>

            <div class="row q-gutter-md q-mt-sm">
              <q-select
                outlined
                use-input
                hide-selected
                fill-input
                input-debounce="500"
                v-model="model.analistaBroker"
                :options="compradorOpts"
                :label="$t('pedido.analistaBroker')"
                option-label="name"
                option-value="_key"
                class="col"
                @filter="filterComprador"
              >
                <template #no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <q-select
                outlined
                use-input
                hide-selected
                fill-input
                input-debounce="500"
                v-model="model.analistaCliente"
                :options="compradorOpts"
                :label="$t('pedido.analistaCliente')"
                option-label="name"
                option-value="_key"
                class="col"
                @filter="filterComprador"
              >
                <template #no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <div class="row q-gutter-md q-mt-sm">
              <q-toolbar class="text-grey">
                <q-toolbar-title>
                  Condição Pagamento
                </q-toolbar-title>
                <q-btn flat round dense color="primary" icon="add" @click="$refs.modalCondicaoPagamento.open()" />
              </q-toolbar>

              <basic-grid
                class="fit"
                :itens="model.condicaoPagamento"
                :cols="condicaoPagamentoCols"
                @edit="(index) => edit($refs.modalCondicaoPagamento, model.condicaoPagamento, '__index', index)"
                @delete="(index) => del(model.condicaoPagamento, '__index', index)"
              >
              </basic-grid>
            </div>

            <div class="row q-gutter-md q-mt-sm">
              <q-toolbar class="text-grey">
                <q-toolbar-title>
                  Custo
                </q-toolbar-title>
                <q-btn flat round dense color="primary" icon="add" @click="$refs.modalCusto.open()" />
              </q-toolbar>

              <basic-grid
                class="fit"
                :itens="model.custo"
                :cols="custoCols"
                @edit="(index) => edit($refs.modalCusto, model.custo, '__index', index)"
                @delete="(index) => del(model.custo, '__index', index)"
              >
              </basic-grid>
            </div>

            <div class="row q-gutter-md q-mt-sm">
              <q-toolbar class="text-grey">
                <q-toolbar-title>
                  Status
                </q-toolbar-title>
                <q-btn flat round dense color="primary" icon="add" @click="$refs.modalStatus.open()" />
              </q-toolbar>

              <basic-grid
                class="fit"
                :itens="model.status"
                :cols="statusCols"
                @edit="(index) => edit($refs.modalStatus, model.status, '__index', index)"
                @delete="(index) => del(model.status, '__index', index)"
              >
              </basic-grid>
            </div>
          </q-step>

          <q-step
            :name="2"
            :title="$t('pedido.step.itens')"
            icon="list"
            :done="step > 2"
          >
            <q-toolbar class="text-grey">
              <q-toolbar-title>
                Itens do pedido
              </q-toolbar-title>
              <q-btn flat round dense color="primary" icon="add" @click="$refs.modalItens.open()" />
            </q-toolbar>

            <basic-grid
              class="fit"
              :itens="model.itens"
              :cols="itensCols"
              @edit="(index) => edit($refs.modalItens, model.itens, '__index', index)"
              @delete="(index) => del(model.itens, '__index', index)"
            />
          </q-step>

          <q-step
            :name="3"
            :title="$t('pedido.step.controlTower')"
            icon="list"
            :done="step > 3"
          >
            controlTower
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 3 ? $t('pedido.stepper.finish') : $t('pedido.stepper.next')" />
              <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>

      <basic-modal
        ref="modalStatus"
        @add="add(model.status, temp)"
        @closing="temp = {}"
        :isEdit="typeof temp.__index !== 'undefined'"
      >
        <template #body>
          <div class="q-gutter-md">
            <q-input
              outlined
              v-model="temp.status"
              :label="$t('pedido.grid.status.status')"
            />

            <basic-datetime
              v-model="temp.dataStatus"
              mask="HH:mm:ss"
              :date="false"
              :label="$t('pedido.grid.status.dataStatus')"
            />
          </div>
        </template>
      </basic-modal>

      <basic-modal
        ref="modalCusto"
        @add="add(model.custo, temp)"
        @closing="temp = {}"
        :isEdit="typeof temp.__index !== 'undefined'"
      >
        <template #body>
          <div class="q-gutter-md">
            <q-input
              outlined
              type="number"
              v-model="temp.despesa"
              :label="$t('pedido.grid.custo.despesa')"
            />

            <q-input
              outlined
              v-model="temp.valor"
              type="number"
              :label="$t('pedido.grid.custo.valor')"
            />
          </div>
        </template>
      </basic-modal>

      <basic-modal
        ref="modalCondicaoPagamento"
        @add="add(model.condicaoPagamento, temp)"
        @closing="temp = {}"
        :isEdit="typeof temp.__index !== 'undefined'"
      >
        <template #body>
          <div class="q-gutter-md">
            <q-select
              outlined
              use-input
              hide-selected
              fill-input
              input-debounce="500"
              v-model="temp.condicaoPagamento"
              :options="condicaoPagamentoOpts"
              :label="$t('pedido.condicaoPagamento')"
              option-label="description"
              option-value="codigo"
              class="col"
              @filter="filterCondicaoPagamento"
            />

            <q-input
              outlined
              type="number"
              v-model="temp.dias"
              :label="$t('pedido.quantidadeDias')"
              class="col"
            />
          </div>
        </template>
      </basic-modal>

      <basic-modal
        ref="modalItens"
        @add="add(model.itens, temp)"
        @closing="temp = {}"
        :isEdit="typeof temp.__index !== 'undefined'"
      >
        <template #body>
          <div class="q-gutter-md">
            <q-input
              outlined
              v-model="temp.codigoProduto"
              :label="$t('pedido.itens.codigoProduto')"
            />

            <q-input
              readonly
              outlined
              v-model="temp.descricaoSimplificada"
              :label="$t('pedido.itens.descricaoSimplificada')"
            />

            <q-input
              readonly
              outlined
              v-model="temp.descricaoCompleta"
              :label="$t('pedido.itens.descricaoSimplificada')"
            />

            <q-select
              type="number"
              outlined
              v-model="temp.li"
              :options="liOpts"
              :label="$t('pedido.itens.li')"
            />

            <q-input
              type="number"
              outlined
              v-model="temp.quantidade"
              :label="$t('pedido.itens.quantidade')"
            />

            <q-input
              readonly
              type="number"
              outlined
              v-model="temp.quantidadeEmbarcada"
              :label="$t('pedido.itens.quantidadeEmbarcada')"
            />

            <q-input
              readonly
              type="number"
              outlined
              v-model="temp.saldo"
              :label="$t('pedido.itens.saldo')"
            />

            <q-input
              type="number"
              outlined
              v-model="temp.unidadeComercializada"
              :label="$t('pedido.itens.unidadeComercializada')"
            />

            <q-input
              type="number"
              outlined
              v-model="temp.pesoLiquidoUnitario"
              :label="$t('pedido.itens.pesoLiquidoUnitario')"
            />

            <q-input
              readonly
              type="number"
              outlined
              v-model="temp.pesoLiquidoTotal"
              :label="$t('pedido.itens.pesoLiquidoTotal')"
            />

            <q-input
              readonly
              type="number"
              outlined
              v-model="temp.valorTotal"
              :label="$t('pedido.itens.valorTotal')"
            />

            <q-select
              outlined
              use-input
              hide-selected
              fill-input
              input-debounce="500"
              v-model="temp.exportador"
              :options="exportadorOpts"
              :label="$t('pedido.itens.exportador')"
              option-label="name"
              option-value="_key"
              class="col"
              @filter="filterExportador"
            >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-select
              outlined
              use-input
              hide-selected
              fill-input
              input-debounce="500"
              v-model="temp.fabricante"
              :options="fabricanteOpts"
              :label="$t('pedido.itens.fabricante')"
              option-label="name"
              option-value="_key"
              class="col"
              @filter="filterFabricante"
            >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-input
              type="number"
              outlined
              v-model="temp.aplicacaoProduto"
              :label="$t('pedido.itens.aplicacaoProduto')"
            />

            <q-select
              outlined
              use-input
              hide-selected
              fill-input
              input-debounce="500"
              v-model="temp.moeda"
              :options="moedaOpts"
              :label="$t('pedido.itens.moeda')"
              option-label="description"
              option-value="codigo"
              class="col"
              @filter="filterMoeda"
            >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-select
              outlined
              use-input
              hide-selected
              fill-input
              input-debounce="500"
              v-model="temp.ncm"
              :options="ncmOpts"
              :label="$t('pedido.itens.ncm')"
              option-label="description"
              option-value="codigo"
              class="col"
              @filter="filterNCM"
            >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </template>
      </basic-modal>
    </div>
  </q-page>
</template>

<script>
import BasicDatetime from '../components/basic/datetime'
import BasicGrid from '../components/basic/grid'
import BasicModal from '../components/basic/modal'

export default {
  name: 'PedidoPage',

  components: {
    BasicDatetime,
    BasicGrid,
    BasicModal
  },

  data () {
    return {
      step: 1,
      model: {
        itens: [],
        status: [],
        custo: [],
        condicaoPagamento: []
      },
      temp: {},
      adquirenteOpts: [],
      importadorOpts: [],
      compradorOpts: [],
      condicaoPagamentoOpts: [],
      exportadorOpts: [],
      fabricanteOpts: [],
      moedaOpts: [],
      ncmOpts: [],
      entries: [],
      pedidoStatusOpts: [{
        label: 'Aberto',
        value: 'aberto'
      }, {
        label: 'Fechado',
        value: 'fechado'
      }, {
        label: '',
        value: null
      }],
      liOpts: [{
        label: 'Não',
        value: 'nao'
      }, {
        label: 'Pré',
        value: 'pre'
      }, {
        label: 'Pós',
        value: 'pos'
      }, {
        label: '',
        value: null
      }],
      condicaoPagamentoCols: [
        { align: 'left', label: 'Condicao Pagamento', field: f => f.condicaoPagamento.description },
        { align: 'left', label: 'Dias', field: 'dias' },
        { align: 'left', label: 'Ações', name: 'acoes' }
      ],
      custoCols: [
        { align: 'left', label: 'Despesa', field: 'despesa' },
        { align: 'left', label: 'Valor', field: 'valor' },
        { align: 'left', label: 'Ações', name: 'acoes' }
      ],
      statusCols: [
        { align: 'left', label: 'Status', field: 'status' },
        { align: 'left', label: 'Data.Status', field: 'dataStatus' },
        { align: 'left', label: 'Ações', name: 'acoes' }
      ],
      itensCols: [
        { align: 'left', label: 'Descrição Simplificada', field: 'descricaoSimplificada' },
        { align: 'left', label: 'L.I', field: f => f.li.label },
        { align: 'left', label: 'Quantidade', field: 'quantidade' },
        { align: 'left', label: 'Quantidade Embarcada', field: 'quantidadeEmbarcada' },
        { align: 'left', label: 'Saldo', field: 'saldo' },
        { align: 'left', label: 'Unidade Comercializada', field: 'unidadeComercializada' },
        { align: 'left', label: 'Peso Liquido Unitário', field: 'pesoLiquidoUnitario' },
        { align: 'left', label: 'Peso Liquido Total', field: 'pesoLiquidoTotal' },
        { align: 'left', label: 'Valor Unitário', field: 'valorUnitario' },
        { align: 'left', label: 'Valor Total', field: 'valorTotal' },
        { align: 'left', label: 'NCM', field: 'ncm' },
        { align: 'left', label: 'Ações', name: 'acoes' }
      ],
      loading: false
    }
  },

  methods: {
    async loadData () {
      try {
        this.loading = true
        if (this.entries.length === 0) {
          let response = await this.$axios.get(`http://10.129.120.113:3000/79f650f1-8b35-484d-b78c-2f76a66d168e/entries`)
          this.entries = response.data.data
        }
      } catch (err) {
      } finally {
        this.loading = false
      }
    },

    async filterImportador (val, update, abort) {
      if (!val) return
      update(() => {
        this.importadorOpts = this.entries
          .filter(f => f.importer)
          .filter(f => String(f.name).includes(val))
      })
    },

    async filterAdquirente (val, update, abort) {
      if (!val) return
      update(() => {
        this.adquirenteOpts = this.entries
          .filter(f => String(f.name).includes(val))
      })
    },

    async filterComprador (val, update, abort) {
      if (!val) return
      update(() => {
        this.compradorOpts = this.entries
          .filter(f => f.cpf)
          .filter(f => String(f.name).includes(val))
      })
    },

    async filterCondicaoPagamento (val, update, abort) {
      if (!val) return

      let response = await this.$axios.get(`http://10.129.120.113:3000/79f650f1-8b35-484d-b78c-2f76a66d168e/siscomex_condicao_pagamento`)
      update(() => {
        this.condicaoPagamentoOpts = response.data.data
          .filter(f => String(f.description).includes(val))
      })
    },

    async filterExportador (val, update, abort) {
      if (!val) return
      update(() => {
        this.exportadorOpts = this.entries
          .filter(f => f.exporter)
          .filter(f => String(f.name).includes(val))
      })
    },

    async filterFabricante (val, update, abort) {
      if (!val) return
      update(() => {
        this.fabricanteOpts = this.entries
          .filter(f => f.cnpj && f.maker)
          .filter(f => String(f.name).includes(val))
      })
    },

    async filterMoeda (val, update, abort) {
      if (!val) return

      let response = await this.$axios.get(`http://10.129.120.113:3000/79f650f1-8b35-484d-b78c-2f76a66d168e/siscomex_moeda`)
      update(() => {
        this.moedaOpts = response.data.data
          .filter(f => String(f.description).includes(val))
      })
    },

    async filterNCM (val, update, abort) {
      if (!val) return

      let response = await this.$axios.get(`http://10.129.120.113:3000/79f650f1-8b35-484d-b78c-2f76a66d168e/siscomex_ncm`)
      update(() => {
        this.ncmOpts = response.data.data
          .filter(f => String(f.description).includes(val))
      })
    },

    add (array, model) {
      if (!Array.isArray(array)) {
        console.warn(`${array} não era um array!`)
        array = []
      }
      array.push(model)
    },

    edit (modal, array, comparador, search) {
      if (!Array.isArray(array)) {
        return console.warn(`${array} não era um array!`)
      }

      this.temp = array.find(f => f[comparador] === search)
      modal.open()
    },

    del (array, comparador, val) {
      if (!Array.isArray(array)) {
        return console.warn(`${array} não era um array!`)
      }

      let index = array.findIndex(f => f[comparador] === val)

      if (index > -1) {
        array.splice(index, 1)
      }
    }
  },

  watch: {
    temp (val) {
      if (val.pesoLiquidoUnitario && val.quantidade) {
        val.pesoLiquidoTotal = val.pesoLiquidoUnitario * val.quantidade
      }

      if ()
    }
  },

  created () {
    this.loadData()

    if (!this.$route.params.id) {
      this.model.refPedido = 'g3r@d0@ut0m@t1c@m3nt3'
      this.model.pedidoStatus = 'aberto'
    }
  }
}
</script>
