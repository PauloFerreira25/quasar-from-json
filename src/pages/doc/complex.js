let arrayData = []

// Deve contem 3 elemenos na tela, sendo eles:
// 1 - Qlabel
// 2 - Input
// 3 - Button
// Definição de cada:
// ---- Qlabel
// só deve aparecer na tela se na store "user" o state "tipo" não esteja null
// Deve usar o valor vindo a store 'user/tipo" no i18n para obter a tradução
// ---- Input
// Deve receber um valor e enviar para a store "user" no state "valorEntrada"
// Deve receber somente numeros
// Deve ser requerido
// Deve ter a tradução (i18n) para label
// Deve ter a tradução para o error
// ---- Button
// Deve validar que o campo input não conhenha erros
// Deve envia a store "user" chamar uma action "callBackend"
// Caso tenha um retorno do backend, se no retorno tiver um campo tipo e este for par, colocar "PF" no state "tipo" do usuario, se o retorno for "impar" colocar "PJ"
arrayData.push({
  _description: 'Complex',
  data: {
    type: 'div',
    key: 'test-key',
    ref: 'test-ref',
    childrens: [{
      type: 'div',
      key: 'test-key',
      ref: 'test-ref',
      render: {
        store: {
          type: 'state',
          path: 'page.tipo',
          rules: ['required']
        }
      },
      rebind: [{
        set: 'domProps.innerHTML',
        get: {
          i18n: {
            path: 'app.name'
          }
        }
      }],
      events: {
        input: {
          store: {
            type: 'commit',
            path: 'doc/changeState',
            actionParams: {
              state: 'qInput',
              value: '$action'
            }
          }
        }
      }
    }, {
      type: 'q-input',
      key: 'a',
      ref: 'b',
      properties: {
        props: {
          type: 'number'
        }
      },
      rebind: [{
        set: 'props.label',
        get: {
          i18n: {
            path: 'input.test'
          }
        }
      }, {
        set: 'props.value',
        get: {
          store: {
            type: 'state',
            path: 'doc.valorEntrada'
          }
        }
      }, {
        set: 'props.rules',
        get: {
          rules: {
            validations: ['required'], // https://www.npmjs.com/package/validatorjs
            message: {
              i18n: {
                path: 'input.error'
              }
            }
          }
        }
      }],
      events: {
        input: {
          store: {
            type: 'commit',
            path: 'doc/changeState',
            actionParams: {
              state: 'valorEntrada',
              value: '$action'
            }
          }
        }
      }
    }, {
      type: 'q-btn',
      key: 'test-key',
      ref: 'test-ref',
      properties: {
        class: 'q-mt-md'
      },
      rebind: [{
        set: 'props.label',
        get: {
          i18n: {
            path: 'btn.label'
          }
        }
      }],
      events: {
        click: {
          store: {
            type: 'dispatch',
            path: 'user/callBackend'
          }
        }
      }
    }]
  }
})

export default arrayData
