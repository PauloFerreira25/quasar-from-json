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

    Object.entries(config.vueInstance.item.events).forEach(([e, event]) => {
      Object.entries(event).forEach(([f, eventHandler]) => {
        let func = this.getterFactory
          .create(f)
          .get({
            type: eventHandler.type,
            path: eventHandler.path,
            params: eventHandler.actionParams
          }, config.vueInstance)

        this.setterFactory
          .create('raw')
          .set({
            path: `on.${e}`,
            data: func
          }, config)
      })
    })

    return config
  }
}
