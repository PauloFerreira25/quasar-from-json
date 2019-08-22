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
        from: 'i18n',
        config: {
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
        from: 'i18n',
        config: {
          path: 'input.store'
        }
      }
    }, {
      set: 'on.input',
      get: {
        from: 'store',
        config: {
          type: 'commit',
          path: 'doc.qInput'
        }
      }
    }]
  }
})

export default arrayData
