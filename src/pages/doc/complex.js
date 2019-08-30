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
          path: 'doc.complex.tipo',
          rules: ['required'] // https://www.npmjs.com/package/validatorjs
        }
      },
      rebind: [{
        set: 'domProps.innerHTML',
        get: {
          i18n: {
            path: {
              store: {
                path: 'doc.complex.tipo'
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
              state: 'complex.qInput',
              value: '$value'
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
            path: 'doc.complex.valorEntrada'
          }
        }
      }, {
        set: 'props.rules',
        get: {
          rules: {
            // https://www.npmjs.com/package/validatorjs
            validations: {
              and: ['required']
            },
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
            path: 'doc/changeState',
            params: {
              state: 'complex.valorEntrada',
              value: '$value'
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
            path: 'doc.complex.teste'
          }
        }
      }, {
        set: 'props.rules',
        get: {
          rules: {
            // https://www.npmjs.com/package/validatorjs
            validations: {
              and: ['required', 'min:1']
            },
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
            path: 'doc/changeState',
            params: {
              state: 'complex.teste',
              value: '$value'
            }
          }
        }]
      }
    }, {
      type: 'q-btn',
      key: 'btn-key',
      ref: 'validate',
      properties: {
        class: 'bg-primary text-white'
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
        click: [{
          cascade: [{
            type: 'validate'
          }, {
            type: 'store',
            config: {
              type: 'dispatch',
              path: 'doc/callBackend'
            }
          }, {
            type: 'conditional',
            lastValue: true,
            config: {
              if: {
                path: '$value.tipo',
                is: 'even'
              },
              then: {
                $return: 'PF'
              },
              else: {
                $return: 'PJ'
              }
            }
          }, {
            type: 'store',
            lastValue: true,
            config: {
              type: 'commit',
              path: 'doc/changeState',
              params: {
                state: 'complex.tipo',
                value: '$value'
              }
            }
          }]
        }]
      }
    }]
  }
})

export default arrayData
