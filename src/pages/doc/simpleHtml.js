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
  _description: 'Div com texto raw',
  data: {
    type: 'div',
    key: 'test-key',
    ref: 'test-ref',
    rebind: [{
      set: 'domProps.innerHTML',
      get: {
        raw: {
          path: 'app.name'
        }
      }
    }]
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
        i18n: {
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
        store: {
          path: 'doc.text',
          // Precisa disso porque o módulo é montado em tempo de execução
          // Se não valor seria vazio
          defaultValue: 'Texto da store'
        }
      }
    }]
  }
})
export default arrayData
