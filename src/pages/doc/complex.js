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
  //   type: 'div',
  //   key: 'test-key',
  //   ref: 'test-ref',
  //   childrens: [{
  //     type: 'q-label',
  //     key: 'test-key',
  //     ref: 'test-ref',
  //     renderRules: [{
  //       type: 'store',
  //       config: {
  //         path: 'user.tipo',
  //         rules: ['notnull']
  //       }
  //     }],
  //     rebind: [{
  //       set: 'props.label',
  //       get: {
  //         from: 'i18n',
  //         config: {
  //           path: 'user.tipo'
  //         }
  //       }
  //     }, {
  //       set: 'on.input',
  //       get: {
  //         from: 'store',
  //         config: {
  //           type: 'commit',
  //           path: 'user.tipo'
  //         }
  //       }
  //     }]
  //   }, {
  //     type: 'q-input',
  //     key: 'test-key',
  //     ref: 'test-ref',
  //     properties: {
  //       props: {
  //         type: 'number'
  //       }
  //     },
  //     rebind: [{
  //       set: 'props.label',
  //       get: {
  //         from: 'i18n',
  //         config: {
  //           path: 'input'
  //         }
  //       }
  //     }, {
  //       set: 'on.input',
  //       get: {
  //         from: 'store',
  //         config: {
  //           type: 'commit',
  //           path: 'user.valorEntrada'
  //         }
  //       }
  //     }, {
  //       set: 'props.rules',
  //       get: {
  //         from: 'rules',
  //         config: {
  //           rules: ['required'],
  //           message: {
  //             type: 'i18n',
  //             config: {
  //               path: 'input.error'
  //             }
  //           }
  //         }
  //       }
  //     }]
  //   }, {
  //     type: 'q-btn',
  //     key: 'test-key',
  //     ref: 'test-ref',
  //     rebind: [{
  //       set: 'props.label',
  //       get: {
  //         from: 'i18n',
  //         config: {
  //           path: 'btn.label'
  //         }
  //       }
  //     }, {
  //       set: 'on.click',
  //       get: {
  //         from: 'store',
  //         config: {
  //           type: 'dispatch',
  //           action: 'callBackend',
  //           onResponse: [{
  //             // ?
  //           }]
  //         }
  //       }
  //     }]
  //   }]
  }
})

export default arrayData
