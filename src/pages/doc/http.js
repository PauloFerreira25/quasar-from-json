let arrayData = []

arrayData.push({
  _description: 'Faz get no backend',
  data: {
    type: 'div',
    ref: 'div.http',
    childrens: [{
      type: 'q-btn',
      ref: 'btn.callbackend',
      properties: {
        class: 'full-width',
        props: {
          color: 'primary',
          label: 'Call 911',
          'no-caps': true
        }
      },
      rebind: [{
        set: 'props.loading',
        get: {
          store: {
            path: 'doc.http.loading',
            defaultValue: false
          }
        }
      }],
      events: {
        click: [{
          cascade: [{
            type: 'store',
            config: {
              type: 'commit',
              path: 'doc/changeState',
              params: {
                state: 'http.loading',
                value: true
              }
            }
          }, {
            type: 'store',
            config: {
              type: 'dispatch',
              path: 'doc/callBackend',
              params: {
                url: `http://localhost:3000`,
                method: `get`
              }
            }
          }, {
            type: 'store',
            lastValue: true,
            config: {
              type: 'commit',
              path: 'doc/changeState',
              params: {
                state: 'http.backendResponse',
                value: '$value'
              }
            }
          }, {
            type: 'store',
            execOnError: true,
            config: {
              type: 'commit',
              path: 'doc/changeState',
              params: {
                state: 'http.loading',
                value: false
              }
            }
          }]
        }]
      }
    }, {
      type: 'span',
      ref: 'span.http',
      domProps: {
        innerHTML: 'Response:'
      }
    }, {
      type: 'pre',
      ref: 'pre.http',
      rebind: [{
        set: 'domProps.innerHTML',
        get: {
          store: {
            path: 'doc.http.backendResponse'
          }
        }
      }]
    }]
  }
})

export default arrayData
