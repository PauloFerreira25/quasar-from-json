let arrayData = []
arrayData.push({
  _description: 'Quasar input',
  data: {
    type: 'q-input',
    key: 'test-key',
    ref: 'test-ref',
    properties: {
      props: {
        outlined: true,
        dense: true
      }
    }
  }
})

arrayData.push({
  _description: 'Quasar input I18n',
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
    rebind: [{
      set: 'props.label',
      get: {
        i18n: {
          path: 'input.test'
        }
      }
    }]
  }
})

arrayData.push({
  _description: 'Quasar input Store Value',
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
    rebind: [{
      set: 'props.label',
      get: {
        i18n: {
          path: 'input.store'
        }
      }
    }, {
      set: 'props.value',
      get: {
        store: {
          path: 'doc.qInput'
        }
      }
    }],
    events: {
      input: {
        store: {
          type: 'commit',
          path: 'doc/changeState',
          params: {
            state: 'qInput',
            value: '$action'
          }
        }
      }
    }
  }
})

export default arrayData
