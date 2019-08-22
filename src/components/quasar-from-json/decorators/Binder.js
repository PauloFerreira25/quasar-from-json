import Base from './Base'
import SetterFactory from '../setters/SetterFactory'

export default class Binder extends Base {
  constructor (decorator) {
    super()
    this.decorator = decorator
    this.setterFactory = new SetterFactory()
  }

  mount (config) {
    config = this.decorator.mount(config)

    config.vueInstance.item.rebind.map(bind => this.setterFactory
      .create('get')
      .set(bind, config)
    )

    return config
  }
}
