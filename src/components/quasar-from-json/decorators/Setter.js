import Base from './Base'
import SetterFactory from '../setters/SetterFactory'

export default class Setter extends Base {
  constructor (decorator) {
    super()
    this.decorator = decorator
    this.setterFactory = new SetterFactory()
  }

  mount (config) {
    config = this.decorator.mount(config)
    config.vueInstance.item.set
      .map(setter => {
        let Setter = this.setterFactory.create(setter.type)
        new Setter().set(setter, config)
      })

    return config
  }
}
