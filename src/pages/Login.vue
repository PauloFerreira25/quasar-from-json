<template>
  <quasar-from-json :item="json" />
</template>

<script>
import QuasarFromJson from '../components/quasar-from-json/quasar-from-json'
import loginJSON from './doc/login'

export default {
  name: 'LoginPage',
  components: {
    QuasarFromJson
  },
  data () {
    return {
      json: loginJSON
    }
  }
}
</script>
