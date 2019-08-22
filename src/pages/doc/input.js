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
      set: 'props.value',
      get: {
        from: 'store',
        config: {
          type: 'state',
          path: 'doc.qInput'
        }
      }
    }],
    events: [{
      from: 'input',
      action: {
        from: 'store',
        config: {
          type: 'commit',
          to: 'changeState',
          module: 'doc',
          params: {
            state: 'qInput',
            value: '$action'
          }
        }
      }
    }]
  }
})

export default arrayData
