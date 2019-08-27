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
    key: 'div-key',
    ref: 'base-ref',
    childrens: [{
      type: 'div',
      key: 'label-key',
      ref: 'some-ref',
      properties: {
        class: 'q-mb-sm'
      },
      render: {
        store: {
          type: 'state',
          path: 'page.tipo',
          rules: ['required'] // https://www.npmjs.com/package/validatorjs
        }
      },
      rebind: [{
        set: 'domProps.innerHTML',
        get: {
          i18n: {
            path: {
              store: {
                path: 'user.tipo'
              }
            }
          }
        }
      }],
      events: {
        input: [{
          store: {
            type: 'commit',
            path: 'doc/changeState',
            params: {
              state: 'qInput',
              value: '$action'
            }
          }
        }]
      }
    }, {
      type: 'q-input',
      key: 'input-key',
      ref: 'input',
      properties: {
        props: {
          type: 'number',
          dense: true,
          outlined: true
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
            path: 'user.valorEntrada'
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
        input: [{
          store: {
            type: 'commit',
            path: 'user/changeState',
            params: {
              state: 'valorEntrada',
              value: '$action'
            }
          }
        }]
      }
    }, {
      type: 'q-input',
      key: 'input-key',
      ref: 'input2',
      properties: {
        props: {
          type: 'number',
          dense: true,
          outlined: true
        }
      },
      rebind: [{
        set: 'props.label',
        get: {
          raw: {
            path: 'teste'
          }
        }
      }, {
        set: 'props.value',
        get: {
          store: {
            type: 'state',
            path: 'user.teste'
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
        input: [{
          store: {
            type: 'commit',
            path: 'user/changeState',
            params: {
              state: 'teste',
              value: '$action'
            }
          }
        }]
      }
    }, {
      type: 'q-btn',
      key: 'btn-key',
      ref: 'validate',
      rebind: [{
        set: 'props.label',
        get: {
          i18n: {
            path: 'btn.label'
          }
        }
      }],
      events: {
        click: [{
          cascade: [{
            type: 'validate'
          }, {
            type: 'store',
            config: {
              type: 'dispatch',
              path: 'user/callBackend'
            }
          }, {
            type: 'store',
            lastValue: true,
            config: {
              type: 'commit',
              path: 'user/changeState',
              params: {
                state: 'tipo',
                value: '$action'
              }
            }
          }]
        }]
      }
    }]
  }
})

export default arrayData
