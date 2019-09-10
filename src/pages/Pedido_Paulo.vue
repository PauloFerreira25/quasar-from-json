<template>
  <q-page class="bg-grey-2 relative-position" padding>
    <div class="row items-start justify-center q-gutter-md">
      <div class="col-8">
        <h1 id="Introduction" class="doc-heading doc-h1">
          Pedido ({{ model.refPedido }})
        </h1>
      </div>
      <div class="col-2">
        <div class="text-purple q-gutter-md" style="font-size: 2em">
          <q-icon name="font_download" />
          <q-icon name="warning" />
          <q-icon name="format_size" />
          <q-icon name="print" />
          <q-icon name="today" />
          <q-icon name="style" />
        </div>
      </div>
    </div>
    <div class="row items-start justify-center q-gutter-md">
      <div class="col-8">
        <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated vertical flat bordered>
          <q-step :name="1" :title="'Capa'" icon="list" :done="step > 1">
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

              <q-select
                outlined
                v-model="model.tipoPreco"
                :options="pedidoStatusOpts"
                :label="$t('pedido.tipoPreco')"
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
          </q-step>
          <q-step :name="2" :title="'Itens'" icon="list" :done="step > 2">
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
          <q-step :name="3" :title="'Condição Pagamento'" icon="list" :done="step > 3">
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
          </q-step>
          <q-step :name="4" :title="'Custos'" icon="list" :done="step > 4">
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
          </q-step>
          <q-step :name="5" :title="'Status'" icon="list" :done="step > 5">
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
        </q-stepper>
      </div>
      <div class="col-2">
        <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6">Resumo do Pedido</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <div class="text-subtitle2">Informações Basicas</div>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label caption lines="2">Numero do Pedido</q-item-label>
                  <q-item-label>
                    {{ model.refPedido }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption lines="2">Valor do Pedido</q-item-label>
                  <q-item-label>
                    {{ model.valorPedido }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption lines="2">Moeda do pedido</q-item-label>
                  <q-item-label>
                    {{ (model.moedaPedido || {}).description }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption lines="2">Exportador</q-item-label>
                  <q-item-label>
                    {{ (model.exportador || {}).name }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption lines="2">Status do pedido</q-item-label>
                  <q-item-label>
                    {{ model.pedidoStatus }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-section>
            <div class="text-subtitle2">Analistas</div>
            <q-list>
              <q-item clickable>
                <q-item-section top avatar>
                  <q-avatar color="primary" text-color="white" icon="person" />
                </q-item-section>
                <q-item-section>
                  <q-item-label caption lines="2">
                    Broker
                    <q-icon name="edit" />
                    <q-popup-edit v-model="model.analistaBroker" buttons persistent>
                      <q-select
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
                    </q-popup-edit>
                  </q-item-label>
                  <q-item-label>
                    {{ (model.analistaBroker || {}).name }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section top avatar>
                  <q-avatar color="primary" text-color="white" icon="person" />
                </q-item-section>
                <q-item-section>
                  <q-item-label caption lines="2">
                    Cliente
                    <q-icon name="edit" />
                    <q-popup-edit v-model="model.analistaCliente" buttons persistent>
                      <q-select
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
                    </q-popup-edit>
                  </q-item-label>
                  <q-item-label>
                    {{ (model.analistaCliente || {}).name }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-separator inset />

          <q-card-section>
            <div class="text-subtitle2">Informações Dos itens</div>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label caption lines="2">Numero de itens no pedido</q-item-label>
                  <q-item-label>
                    {{ numItensPedido }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption lines="2">Total de Impostos</q-item-label>
                  <q-item-label>123456</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <q-card flat bordered class="my-card q-mt-sm">
          <q-card-section>
            <div class="text-h6">Controle</div>
            <div class="text-subtitle2">Ciclo de vida do pedido</div>
          </q-card-section>

          <q-separator />

          <q-card-actions vertical>
            <q-btn flat label="Validar" />
            <q-btn color="primary" label="Processar" @click="processar" :loading="processando" />
            <q-btn color="secondary" label="Fechar" />
          </q-card-actions>
        </q-card>
      </div>
      <basic-modal
        ref="modalStatus"
        :model="temp"
        @update="data => add(model.status, data)"
        :isEdit="typeof temp.__index !== 'undefined'"
      >
        <template #body="{ model }">
          <div class="q-gutter-md">
            <q-input
              outlined
              v-model="model.status"
              :label="$t('pedido.grid.status.status')"
            />

            <basic-datetime
              v-model="model.dataStatus"
              mask="HH:mm:ss"
              :date="false"
              :label="$t('pedido.grid.status.dataStatus')"
            />
          </div>
        </template>
      </basic-modal>

      <basic-modal
        ref="modalCusto"
        :model="temp"
        @update="data => add(model.custo, data)"
        :isEdit="typeof temp.__index !== 'undefined'"
      >
        <template #body="{ model }">
          <div class="q-gutter-md">
            <q-input
              outlined
              v-model="model.despesa"
              :label="$t('pedido.grid.custo.despesa')"
            />

            <q-input
              outlined
              v-model="model.valor"
              type="number"
              :label="$t('pedido.grid.custo.valor')"
            />
          </div>
        </template>
      </basic-modal>

      <basic-modal
        ref="modalCondicaoPagamento"
        :model="temp"
        @update="data => add(model.condicaoPagamento, data)"
        :isEdit="typeof temp.__index !== 'undefined'"
      >
        <template #body="{ model }">
          <div class="q-gutter-md">
            <q-select
              outlined
              use-input
              hide-selected
              fill-input
              input-debounce="500"
              v-model="model.condicaoPagamento"
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
              v-model="model.dias"
              :label="$t('pedido.quantidadeDias')"
              class="col"
            />
          </div>
        </template>
      </basic-modal>

      <basic-modal
        ref="modalItens"
        :model="temp"
        @update="data => add(model.itens, data)"
        :isEdit="typeof temp.__index !== 'undefined'"
      >
        <template #body="{ model }">
          <div class="row q-gutter-md q-mt-sm">
            <q-select
              outlined
              use-input
              hide-selected
              fill-input
              input-debounce="500"
              v-model="model.produto"
              :options="produtoOpts"
              :label="$t('pedido.produto')"
              option-label="descricaoSimplificada"
              option-value="_key"
              class="col"
              @filter="filterProduto"
            >
              <template #no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-field
              readonly
              outlined
              class="col"
              stack-label
              :label="$t('pedido.itens.fabricante')"
            >
              <template #control>
                <div
                  tabindex="0"
                  class="self-center full-width no-outline"
                >
                  {{ model.produto ? model.produto.fabricante : '' }}
                </div>
              </template>
            </q-field>
          </div>

          <div class="row q-gutter-md q-mt-sm">
            <q-field
              readonly
              outlined
              class="col"
              stack-label
              :label="$t('pedido.itens.descricaoSimplificada')"
            >
              <template #control>
                <div
                  tabindex="0"
                  class="self-center full-width no-outline"
                >
                  {{ model.produto ? model.produto.descricaoSimplificada : '' }}
                </div>
              </template>
            </q-field>

            <q-field
              readonly
              outlined
              class="col"
              stack-label
              :label="$t('pedido.itens.descCompleta')"
            >
              <template #control>
                <div
                  tabindex="0"
                  class="self-center full-width no-outline"
                >
                  {{ model.produto ? model.produto.descricaoCompletaPT : '' }}
                </div>
              </template>
            </q-field>
          </div>

          <div class="row q-gutter-md q-mt-sm">
            <q-select
              type="number"
              outlined
              class="col"
              v-model="model.li"
              :options="liOpts"
              :label="$t('pedido.itens.li')"
            />

            <q-input
              type="number"
              outlined
              class="col"
              v-model="model.quantidade"
              :label="$t('pedido.itens.quantidade')"
            />

            <q-input
              readonly
              type="number"
              class="col"
              outlined
              v-model="model.quantidadeEmbarcada"
              :label="$t('pedido.itens.quantidadeEmbarcada')"
            />
          </div>

          <div class="row q-gutter-md q-mt-sm">
            <q-input
              readonly
              type="number"
              outlined
              class="col"
              v-model="model.saldo"
              :label="$t('pedido.itens.saldo')"
            />

            <q-select
              outlined
              use-input
              hide-selected
              fill-input
              input-debounce="500"
              v-model="model.unidadeComercializada"
              :options="unidadeComercializadaOpts"
              :label="$t('pedido.unidadeComercializada')"
              option-label="description"
              option-value="_key"
              class="col"
              @filter="filterUnidadeComercializada"
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
              type="number"
              outlined
              class="col"
              v-model="model.pesoLiquidoUnitario"
              :label="$t('pedido.itens.pesoLiquidoUnitario')"
            />

            <q-field
              readonly
              outlined
              class="col"
              stack-label
              :label="$t('pedido.itens.pesoLiquidoTotal')"
            >
              <template #control>
                <div
                  tabindex="0"
                  class="self-center full-width no-outline"
                >
                  {{ model.pesoLiquidoUnitario && model.quantidade ? model.pesoLiquidoUnitario * model.quantidade : 0 }}
                </div>
              </template>
            </q-field>
          </div>

          <div class="row q-gutter-md q-mt-sm">
            <q-input
              type="number"
              outlined
              class="col"
              v-model="model.valorUnitario"
              :label="$t('pedido.itens.valorUnitario')"
            />

            <q-field
              readonly
              outlined
              class="col"
              stack-label
              :label="$t('pedido.itens.valorTotal')"
            >
              <template #control>
                <div
                  tabindex="0"
                  class="self-center full-width no-outline"
                >
                  {{ model.valorUnitario && model.quantidade ? model.valorUnitario * model.quantidade : 0 }}
                </div>
              </template>
            </q-field>
          </div>

          <div class="row q-gutter-md q-mt-sm">
            <q-select
              outlined
              use-input
              hide-selected
              fill-input
              input-debounce="500"
              v-model="model.exportador"
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

            <q-input
              type="number"
              outlined
              class="col"
              v-model="model.aplicacaoProduto"
              :label="$t('pedido.itens.aplicacaoProduto')"
            />
          </div>

          <div class="row q-gutter-md q-mt-sm">
            <q-select
              outlined
              use-input
              hide-selected
              fill-input
              input-debounce="500"
              v-model="model.moeda"
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

            <q-field
              readonly
              outlined
              class="col"
              stack-label
              :label="$t('pedido.itens.ncm')"
            >
              <template #control>
                <div
                  tabindex="0"
                  class="self-center full-width no-outline"
                >
                  {{ model.produto ? model.produto.ncm : '' }}
                </div>
              </template>
            </q-field>
          </div>
        </template>
      </basic-modal>
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<style lang="stylus" scoped>
.doc-h1 {
  font-size: 2rem;
  line-height: 2rem;
  padding: 1rem 0;
  font-weight: 500;
  margin: 0 0 2rem;
}

.doc-heading {
  color: #027be3;
  cursor: pointer;
}

.my-card {
  width: 100%;
  max-width: 250px;
}
</style>

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
        refPedido: '',
        itens: [],
        status: [],
        custo: [],
        condicaoPagamento: [],
        controlTower: []
      },
      temp: {},
      adquirenteOpts: [],
      importadorOpts: [],
      compradorOpts: [],
      condicaoPagamentoOpts: [],
      exportadorOpts: [],
      fabricanteOpts: [],
      produtoOpts: [],
      moedaOpts: [],
      unidadeComercializadaOpts: [],
      ncmOpts: [],
      entries: [],
      pedidoStatusOpts: [{
        label: 'Aberto',
        value: 'Aberto'
      }, {
        label: 'Fechado',
        value: 'Fechado'
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
        { align: 'left', label: 'Descrição Simplificada', field: f => f.produto ? f.produto.descricaoSimplificada : '' },
        { align: 'left', label: 'L.I', field: f => f.li ? f.li.label : '' },
        { align: 'left', label: 'Quantidade', field: 'quantidade' },
        { align: 'left', label: 'Quantidade Embarcada', field: 'quantidadeEmbarcada' },
        { align: 'left', label: 'Saldo', field: 'saldo' },
        { align: 'left', label: 'Unidade Comercializada', field: f => f.unidadeComercializada ? f.unidadeComercializada.description : '' },
        { align: 'left', label: 'Peso Liquido Unitário', field: 'pesoLiquidoUnitario' },
        { align: 'left', label: 'Peso Liquido Total', field: f => f.pesoLiquidoUnitario && f.quantidade ? f.pesoLiquidoUnitario * f.quantidade : 0 },
        { align: 'left', label: 'Valor Unitário', field: 'valorUnitario' },
        { align: 'left', label: 'Valor Total', field: f => f.valorUnitario && f.quantidade ? f.valorUnitario * f.quantidade : 0 },
        { align: 'left', label: 'NCM', field: f => f.produto ? f.produto.ncm : '' },
        { align: 'left', label: 'Ações', name: 'acoes' }
      ],
      controlTowerCols: [
        { align: 'left', label: 'Código CT', name: 'codigoCT' },
        { align: 'left', label: 'Ref. Embarque Broker', name: 'refEmbarqueBroker' },
        { align: 'left', label: 'Data Requisição', name: 'dataRequisicao' },
        { align: 'left', label: 'Analista Cliente', name: 'analistaCliente' },
        { align: 'left', label: 'Analista Broker', name: 'analistaBroker' },
        { align: 'left', label: 'Ações', name: 'acoes' }
      ],
      loading: false,
      processando: false
    }
  },

  computed: {
    numItensPedido () {
      return this.model.itens.length
    }
  },

  methods: {
    async loadData () {
      try {
        this.loading = true
        if (this.entries.length === 0) {
          let response = await this.$axios.get(`${process.env.API}/79f650f1-8b35-484d-b78c-2f76a66d168e/entries`)
          this.entries = response.data.data
        }

        if (this.$route.params.id) {
          let response = await this.$axios.get(
            `${process.env.API}/79f650f1-8b35-484d-b78c-2f76a66d168e/importacao_pedido/${this.$route.params.id}`
          )
          this.model = response.data.data
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async processar () {
      try {
        this.processando = true
        let method = this.$route.params.id
          ? 'patch'
          : 'post'

        let baseURL = `${process.env.API}/79f650f1-8b35-484d-b78c-2f76a66d168e/importacao_pedido`
        let url = this.$route.params.id
          ? `${baseURL}/${this.$route.params.id}`
          : baseURL

        let response = await this.$axios({
          url,
          method,
          data: this.model
        })

        this.$q.notify({
          message: 'Processado com sucesso',
          color: 'positive'
        })

        if (!this.$route.params.id) {
          this.$router.push(`/pedido_paulo/${response.data.status._key}`)
        }
      } catch (err) {
        this.$q.notify({
          message: 'Oh oh, algo deu errado',
          color: 'negative'
        })
      } finally {
        this.processando = false
      }
    },

    async filterImportador (val, update, abort) {
      update(() => {
        this.importadorOpts = this.entries
          .filter(f => f.importer)
          .filter(f => String(f.name).includes(val))
      })
    },

    async filterAdquirente (val, update, abort) {
      update(() => {
        this.adquirenteOpts = this.entries
          .filter(f => String(f.name).includes(val))
      })
    },

    async filterComprador (val, update, abort) {
      update(() => {
        this.compradorOpts = this.entries
          .filter(f => f.cpf)
          .filter(f => String(f.name).includes(val))
      })
    },

    async filterProduto (val, update, abort) {
      let response = await this.$axios.get(`${process.env.API}/79f650f1-8b35-484d-b78c-2f76a66d168e/products`)
      update(() => {
        this.produtoOpts = response.data.data
          .filter(f =>
            String(f.codigo).includes(val) ||
            String(f.codigo2).includes(val) ||
            String(f.descricaoSimplificada).includes(val) ||
            String(f.descricaoCompletaPT).includes(val)
          )
      })
    },

    async filterUnidadeComercializada (val, update, abort) {
      let response = await this.$axios.get(`${process.env.API}/79f650f1-8b35-484d-b78c-2f76a66d168e/siscomex_unidade_medida`)
      update(() => {
        this.unidadeComercializadaOpts = response.data.data
          .filter(f => String(f.description).includes(val))
      })
    },

    async filterCondicaoPagamento (val, update, abort) {
      let response = await this.$axios.get(`${process.env.API}/79f650f1-8b35-484d-b78c-2f76a66d168e/siscomex_condicao_pagamento`)
      update(() => {
        this.condicaoPagamentoOpts = response.data.data
          .filter(f => String(f.description).includes(val))
      })
    },

    async filterExportador (val, update, abort) {
      update(() => {
        this.exportadorOpts = this.entries
          .filter(f => f.exporter)
          .filter(f => String(f.name).includes(val))
      })
    },

    async filterFabricante (val, update, abort) {
      update(() => {
        this.fabricanteOpts = this.entries
          .filter(f => f.cnpj && f.maker)
          .filter(f => String(f.name).includes(val))
      })
    },

    async filterMoeda (val, update, abort) {
      let response = await this.$axios.get(`${process.env.API}/79f650f1-8b35-484d-b78c-2f76a66d168e/siscomex_moeda`)
      update(() => {
        this.moedaOpts = response.data.data
          .filter(f => String(f.description).includes(val) || String(f.codigo).includes(val))
      })
    },

    async filterNCM (val, update, abort) {
      let response = await this.$axios.get(`${process.env.API}/79f650f1-8b35-484d-b78c-2f76a66d168e/siscomex_ncm`)
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

      if (typeof model.__index !== 'undefined') {
        let index = array.findIndex(f => f.__index === model.__index)
        if (index !== -1) {
          this.$set(array, index, model)
          this.temp = {}
          return
        }
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
    },

    closeStatus (val) {
      if (val && !val.dataStatus) {
        let date = new Date()
        val.dataStatus = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      }
    }
  },
  // TODO: concertar
  watch: {
    '$route.params.id' (val) {
      if (!val) {
        this.model = {
          itens: [],
          status: [],
          custo: [],
          condicaoPagamento: [],
          controlTower: []
        }
        return
      }
      this.loadData()
    },

    'model.itens': {
      deep: true,
      handler (val) {
        if (val.length > 0) {
          this.model.exportador = val[0].exportador
          this.model.moedaPedido = val[0].moeda
          this.model.valorPedido = val
            .filter(f => f.valorUnitario && f.quantidade)
            .map(f => Number(f.valorUnitario) * Number(f.quantidade))
            .reduce((acc, atual) => acc + atual, 0)
        }
      }
    },

    'model.status': {
      deep: true,
      handler (val) {
        this.closeStatus(val[val.length - 1])
      }
    }
  },

  created () {
    this.loadData()

    if (!this.$route.params.id) {
      // Gambeta
      this.$axios.get(
        `${process.env.API}/79f650f1-8b35-484d-b78c-2f76a66d168e/importacao_pedido`
      ).then(response => {
        let ultimo = response.data.data
          .reduce((acc, atual) => {
            let ref = Number(atual.refPedido.split('PCX')[1]) + 1
            return ref > acc ? ref : acc
          }, 0)

        let ref = String(ultimo).length < 4
          ? '0'.repeat(4 - String(ultimo).length) + ultimo
          : ultimo

        this.model.refPedido = `19PCX${ref}`
        this.model.pedidoStatus = 'Aberto'
      })
    }
  }
}
</script>
