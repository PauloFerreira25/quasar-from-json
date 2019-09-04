import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'

Vue.use(VueI18n)

export default ({ app }) => {
  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: 'en-us',
    fallbackLocale: 'en-us',
    messages
  })
}

// export { i18n }
