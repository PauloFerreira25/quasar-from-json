<template>
  <q-page padding>

    <div v-for="(element, index) in elements" class="row q-gutter-sm" :key="index">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-primary">{{ element.description }}</div>
        </q-card-section>

        <q-card-section>
          <quasar-from-json :item="element.data" />
        </q-card-section>
      </q-card>
    </div>

  </q-page>
</template>

<script>
import QuasarFromJson from '../components/quasar-from-json/quasar-from-json'

export default {
  name: 'DocPage',
  components: {
    QuasarFromJson
  },
  data () {
    return {
      elements: [{
        description: 'Uma div com texto',
        data: {
          type: 'div',
          key: 'test-key',
          ref: 'test-ref',
          get: [{
            type: 'raw',
            path: 'Texto',
            ref: 'teste_raw_text'
          }],
          set: [{
            path: 'domProps.innerHTML',
            type: 'getter',
            getter: 'teste_raw_text'
          }]
        }
      }, {
        description: 'Uma div com texto do i18n',
        data: {
          type: 'div',
          key: 'test-key',
          ref: 'test-ref',
          get: [{
            type: 'i18n',
            path: 'app.name',
            ref: 'teste_raw_text'
          }],
          set: [{
            path: 'domProps.innerHTML',
            type: 'getter',
            getter: 'teste_raw_text'
          }]
        }
      }]
    }
  }
}
</script>
