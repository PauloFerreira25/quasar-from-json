import pathUtils from '../../components/quasar-from-json/utils/path'

export const changeState = (state, data) => {
  let path = data.state.split('.')
  if (path.length > 1) {
    pathUtils.findAndSet(path, state, data.value)
  }

  state[data.state] = data.value
}
