<template>
  <q-page padding>

    <div class="q-pa-md row items-start q-gutter-md">
      <q-card v-for="(element, index) in elements" :key="index">
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
  computed: {
    a () {
      return this.$store.state.doc
    }
  },
  data () {
    return {
      elements: [{
        description: 'Div com texto',
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
        description: 'Div com texto do i18n',
        data: {
          type: 'div',
          key: 'test-key',
          ref: 'test-ref',
          get: [{
            type: 'i18n',
            path: 'app.name',
            ref: 'teste_i18n'
          }],
          set: [{
            path: 'domProps.innerHTML',
            type: 'getter',
            getter: 'teste_i18n'
          }]
        }
      }, {
        description: 'Quasar input',
        data: {
          type: 'q-input',
          key: 'test-key',
          ref: 'test-ref',
          properties: {
            props: {
              outlined: true,
              dense: true
            }
          },
          get: [{
            type: 'i18n',
            path: 'app.name',
            ref: 'i18n'
          }, {
            type: 'store',
            path: 'doc.qInput',
            ref: 'store_getter_qinput'
          }],
          set: [{
            path: 'props.label',
            type: 'getter',
            getter: 'i18n'
          }, {
            path: 'props.value',
            type: 'getter',
            getter: 'store_getter_qinput'
          }, {
            path: 'on.input',
            type: 'store',
            state: 'doc.qInput'
          }]
        }
      }, {
        description: '1 getter 2 setters',
        data: {
          type: 'q-input',
          key: 'test-key',
          ref: 'test-ref',
          properties: {
            props: {
              outlined: true,
              dense: true
            }
          },
          get: [{
            type: 'i18n',
            path: 'app.name',
            ref: 'i18n'
          }, {
            type: 'store',
            path: 'doc.qInput',
            ref: 'store_getter_qinput'
          }],
          set: [{
            path: 'props.label',
            type: 'getter',
            getter: 'i18n'
          }, {
            path: 'props.hint',
            type: 'getter',
            getter: 'i18n'
          }, {
            path: 'props.value',
            type: 'getter',
            getter: 'store_getter_qinput'
          }, {
            path: 'on.input',
            type: 'store',
            state: 'doc.qInput'
          }]
        }
      }]
    }
  }
}
</script>
