import Base from './Base'
import SetterFactory from '../setters/SetterFactory'
import GetterFactory from '../getters/GetterFactory'

export default class Binder extends Base {
  constructor (decorator) {
    super()
    this.decorator = decorator
    this.setterFactory = new SetterFactory()
    this.getterFactory = new GetterFactory()
  }

  mount (config) {
    config = this.decorator.mount(config)

    let grid = config.vueInstance.item.grid
    if (!grid.from) {
      console.warn(`Ǹão foi repassada informação de como achar o dado no grid! ${config.vueInstance.item.ref || config.vueInstance.item.key}`)
      return config
    }

    if (grid.from.store) {
      let storePath = JSON.parse(JSON.stringify(grid.from.store)).split('.')

      let store = this.getterFactory
        .create('store')

      let commit = store
        .get({
          type: 'commit',
          path: `${storePath.shift()}/changeState`,
          params: {
            state: `${storePath.join('.')}.${grid.index}.${grid.field}`,
            value: '$value'
          }
        }, config.vueInstance)

      this.setterFactory
        .create('raw')
        .set({
          path: 'on.input',
          data: commit
        }, config)

      this.setterFactory
        .create('raw')
        .set({
          path: 'props.value',
          data: store.get({
            path: `${grid.from.store}.${grid.index}.${grid.field}`
          }, config.vueInstance)
        }, config)
    }

    // TODO: configurar outras possibilidades

    return config
  }
}
