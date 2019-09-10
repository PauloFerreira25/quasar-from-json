<template>
  <!-- <quasar-from-json
    v-if="drawPage"
    :item="currentPage"
  /> -->
  <div class="q-pa-xl">
    <pre>{{ model }}</pre>

    <q-btn label="open" @click="$refs.modal.open()" />
    <modal
      :model="model.anotherModel"
      ref="modal"
      :is-edit="true"
      @update="data => model.anotherModel = data"
    >
      <template #body="{ model }">
        <q-input v-model="model.input" />
      </template>
    </modal>
  </div>
</template>

<script>
// import QuasarFromJson from '../components/quasar-from-json/quasar-from-json'
import Modal from '../components/basic/modal'

export default {
  name: 'TestPage',
  components: {
    // QuasarFromJson
    Modal
  },
  data () {
    return {
      currentPage: null,
      page: null,
      model: {
        anotherModel: {}
      }
    }
  },
  computed: {
    drawPage () {
      return this.currentPage
    }
  },
  watch: {
    '$route.params.pathMatch': {
      immediate: true,
      async handler (val) {
        console.log(val)
        let response = await this.$axios.get(`${process.env.API}/dynamicPage/byName?path=/${val}`)
        this.currentPage = response.data.data.data
      }
    }
  }
}
</script>
