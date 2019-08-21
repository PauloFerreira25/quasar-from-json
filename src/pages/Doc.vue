<template>
  <q-page padding>

    <template v-for="(element, index) in elements" class="row q-gutter-md">
      <q-card class="col" :key="index">
        <q-card-section>
          <div class="text-h6 text-primary">{{ element.description }}</div>
        </q-card-section>

        <q-card-section>
          <quasar-from-json :item="element.data" />
        </q-card-section>
      </q-card>
    </template>

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
