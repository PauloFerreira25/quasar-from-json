export const changeState = (state, data) => {
  state[data.state] = data.value
}
