export default class Router {
  get (definition, vueInstance) {
    return () => vueInstance.$router.push(definition.path)
  }
}
