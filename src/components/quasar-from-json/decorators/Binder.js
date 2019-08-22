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

    config.vueInstance.item.rebind.map(bind => {
      let getter = this.setterFactory
        .create('get')
      Object.keys(bind.get)
        .map(key => getter
          .set(key, bind.get[key], bind.set, config)
        )
    })

    return config
  }
}
