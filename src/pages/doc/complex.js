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
  data: {}
})

export default arrayData
