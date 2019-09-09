<script>
export default {
  name: 'LevelDrawer',

  data () {
    return {
      currentPath: [],
      beforeTemplate: {
        icon: 'navigate_before',
        returnButton: true,
        label: ''
      },
      itens: [{
        to: '/pedidos',
        icon: 'list',
        label: 'Pedidos'
      }, {
        label: 'Level1',
        childrens: [{
          label: 'Level2 A'
        }, {
          label: 'Level2 B',
          childrens: [{
            label: 'Level3'
          }]
        }]
      }]
    }
  },

  render (renderFunction) {
    let traverse = true
    let list = JSON.parse(JSON.stringify(this.itens))
    let cPath = JSON.parse(JSON.stringify(this.currentPath))

    while (traverse && cPath.length > 0) {
      let next = cPath.shift()
      let found = list.find(f => f.label === next)

      if (!found) {
        traverse = false
      } else {
        list = found.childrens
      }
    }

    let childrens = list.map(item => this.createItem(renderFunction, item))

    if (this.currentPath.length > 0) {
      let templateClone = JSON.parse(JSON.stringify(this.beforeTemplate))
      templateClone.label = this.currentPath[this.currentPath.length - 1]
      childrens.unshift(renderFunction('q-separator'))
      childrens.unshift(this.createItem(renderFunction, templateClone))
    }

    return this.createTransition(renderFunction, [
      renderFunction('q-list', {
        key: this.currentPath.length
      }, childrens)
    ])
  },

  methods: {
    createTransition (renderFunction, childrens) {
      return renderFunction('transition', {
        props: {
          'enter-active-class': 'animated slideInLeft',
          'leave-active-class': 'animated slideOutRight',
          mode: 'out-in'
        }
      }, childrens)
    },

    createItem (renderFunction, item) {
      return renderFunction('q-item', {
        props: {
          to: item.to,
          clickable: true,
          key: item.label
        },
        on: {
          click: this.checkPath(item)
        }
      }, [
        this.createSection(renderFunction, 'icon', { name: item.icon }),
        this.createSection(renderFunction, 'label', { label: item.label })
      ])
    },

    createSection (renderFunction, type, data) {
      let child = null
      switch (type) {
        case 'icon':
          child = renderFunction('q-icon', {
            props: {
              name: data.name
            }
          })
          break
        case 'label':
          child = renderFunction('div', {
            domProps: {
              innerHTML: data.label
            }
          })
          break
        default:
          break
      }

      return renderFunction('q-item-section', {
        props: {
          avatar: type === 'icon'
        }
      }, [ child ])
    },

    checkPath (item) {
      if (item.to) {
        return () => {}
      }
      return () => {
        if (item.returnButton) {
          return this.currentPath.pop()
        }

        if (item.childrens) {
          this.currentPath.push(item.label)
        }
      }
    }
  }
}
</script>
