<template>
  <q-page padding>

    <div class="q-pa-md row items-start q-gutter-md">
      <q-card v-for="(element, index) in elements" :key="index">
        <q-card-section>
          <div class="text-h6 text-primary">{{ element._description }}</div>
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
import docs from './doc/index'

export default {
  name: 'DocPage',
  components: {
    QuasarFromJson
  },
  data () {
    return {
      elements: docs
    }
  }
}
</script>
