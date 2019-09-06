<template>
  <q-page class="bg-grey-2" padding>
    <h1 id="Introduction" class="doc-heading doc-h1">
      <span>Pedido (123456)</span>
    </h1>
    <div class="row items-start q-gutter-md">
      <div class="col-8">
        <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated vertical>
          <q-step :name="1" :title="'Capa'" icon="list" :done="step > 1"></q-step>
          <q-step :name="1" :title="'Itens'" icon="list" :done="step > 1"></q-step>
          <q-step :name="1" :title="'Condição Pagamento'" icon="list" :done="step > 1"></q-step>
          <q-step :name="1" :title="'Custos'" icon="list" :done="step > 1"></q-step>
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
                  <q-item-label>123456</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption lines="2">Valor do Pedido</q-item-label>
                  <q-item-label>123456</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption lines="2">Moeda do pedido</q-item-label>
                  <q-item-label>123456</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-section>
            <div class="text-subtitle2">Analistas</div>
            <q-list>
              <q-item clickable>
                <q-item-section top avatar>
                  <q-avatar color="primary" text-color="white" icon="bluetooth" />
                </q-item-section>
                <q-item-section>
                  <q-item-label caption lines="2">
                    Broken
                    <q-icon name="edit" />
                  </q-item-label>
                  <q-item-label>123456</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section top avatar>
                  <q-avatar color="primary" text-color="white" icon="bluetooth" />
                </q-item-section>
                <q-item-section>
                  <q-item-label caption lines="2">
                    Cliente
                    <q-icon name="edit" />
                  </q-item-label>
                  <q-item-label>123456</q-item-label>
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
                  <q-item-label>123456</q-item-label>
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
        <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h6">Controle</div>
            <div class="text-subtitle2">Ciclo de vida do pedido</div>
          </q-card-section>
          <q-card-section>
            <q-btn color="white" text-color="black" label="Validar" />
            <q-btn color="primary" label="Processar" />
            <q-btn color="secondary" label="Fechar" />
          </q-card-section>
        </q-card>
      </div>
    </div>
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
