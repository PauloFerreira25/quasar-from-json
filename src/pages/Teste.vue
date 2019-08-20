<template>
  <q-page>
    <quasar-from-json
      v-if="drawPage"
      :item="currentPage"
    />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

import QuasarFromJson from '../components/quasar-from-json/quasar-from-json'

export default {
  name: 'TestPage',
  components: {
    QuasarFromJson
  },
  computed: {
    ...mapGetters({
      currentPage: 'page/getPageItem'
    }),
    drawPage () {
      return this.currentPage
    }
  },
  data () {
    return {
      page: null
    }
  },
  watch: {
    '$route.params.page': {
      immediate: true,
      async handler (val) {
        this.$store.dispatch('page/fetchPage', val)
      }
    }
  }
}
</script>
