let arrayData = []
arrayData.push({
  _description: 'Div com texto',
  data: {
    type: 'div',
    key: 'test-key',
    ref: 'test-ref',
    properties: {
      domProps: {
        innerHTML: 'Div com texto'
      }
    }
  }
})
arrayData.push({
  _description: 'Div com texto do i18n',
  data: {
    type: 'div',
    key: 'test-key',
    ref: 'test-ref',
    rebind: [{
      set: 'domProps.innerHTML',
      get: {
        from: 'i18n',
        config: {
          type: 't',
          path: 'app.name'
        }
      }
    }]
  }
})
arrayData.push({
  _description: 'Div com texto vindo da store',
  data: {
    type: 'div',
    key: 'test-key',
    ref: 'test-ref',
    rebind: [{
      set: 'domProps.innerHTML',
      get: {
        from: 'store',
        config: {
          type: 'state',
          path: 'doc.text'
        }
      }
    }]
  }
})
export default arrayData
