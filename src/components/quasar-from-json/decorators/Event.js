import Base from './Base'
import GetterFactory from '../getters/GetterFactory'
import SetterFactory from '../setters/SetterFactory'

export default class Event extends Base {
  constructor (decorator) {
    super()
    this.decorator = decorator
    this.setterFactory = new SetterFactory()
    this.getterFactory = new GetterFactory()
  }

  mount (config) {
    config = this.decorator.mount(config)

    config.vueInstance.item.events.map(event => {
      let func = this.getterFactory
        .create(event.action.from)
        .get({
          type: event.action.config.type,
          module: event.action.config.module,
          to: event.action.config.to,
          params: event.action.config.params
        }, config.vueInstance)

      this.setterFactory
        .create('raw')
        .set({
          path: `on.${event.from}`,
          data: func
        }, config)
    })

    return config
  }
}
