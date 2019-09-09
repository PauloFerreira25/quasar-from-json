<template>
  <quasar-from-json
    v-if="drawPage"
    :item="currentPage"
  />
</template>

<script>
import QuasarFromJson from '../components/quasar-from-json/quasar-from-json'

export default {
  name: 'TestPage',
  components: {
    QuasarFromJson
  },
  data () {
    return {
      currentPage: null,
      page: null
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
