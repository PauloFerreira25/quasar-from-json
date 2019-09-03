let arrayData = []
arrayData.push({
  _description: 'Stepper',
  data: {
    type: 'q-stepper',
    key: 'stepper',
    ref: 'ref.stepper',
    rebind: [{
      set: 'props.value',
      get: {
        store: {
          path: 'doc.stepper.step',
          defaultValue: '1'
        }
      }
    }],
    slots: {
      default: [{
        type: 'q-step',
        properties: {
          props: {
            title: 'Primeiro step'
          }
        },
        rebind: [{
          set: 'props.name',
          get: {
            raw: {
              path: '1'
            }
          }
        }],
        childrens: [{
          type: 'div',
          rebind: [{
            set: 'domProps.innerHTML',
            get: {
              store: {
                path: 'doc.stepper.step',
                defaultValue: 1
              }
            }
          }]
        }]
      }]
    }
  }
})

export default arrayData
