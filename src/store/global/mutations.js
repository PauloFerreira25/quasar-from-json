export const changeState = (state, data) => {
  state[data.state] = data.value
}

export const addRef = (state, ref) => {
  if (ref) {
    Object.entries(ref).forEach(([k, v]) => {
      state.refs[k] = v
    })
  }
}
