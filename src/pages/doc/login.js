export default {
  type: 'div',
  properties: {
    class: 'absolute-full flex flex-center'
  },
  childrens: [{
    type: 'q-card',
    properties: {
      class: 'login-card q-pa-lg',
      style: 'min-height: 400px; min-width: 400px',
      props: {
        flat: true,
        bordered: true
      }
    },
    childrens: [{
      type: 'q-card-section',
      childrens: [{
        type: 'div',
        properties: {
          class: 'flex flex-center text-primary'
        },
        rebind: [{
          set: 'domProps.innerHTML',
          get: {
            i18n: {
              path: 'app.name'
            }
          }
        }]
      }]
    }, {
      type: 'q-card-section',
      childrens: [{
        type: 'div',
        properties: {
          class: 'text-h5 flex flex-center'
        },
        rebind: [{
          set: 'domProps.innerHTML',
          get: {
            i18n: {
              path: 'message.login.t1'
            }
          }
        }]
      }]
    }, {
      type: 'q-card-section',
      properties: {
        class: 'text flex flex-center'
      },
      childrens: [{
        type: 'q-chip',
        properties: {
          class: 'cursor-pointer',
          props: {
            clickable: true,
            'icon-right': 'keyboard_arrow_down'
          }
        },
        render: {
          store: {
            type: 'state',
            path: 'user.login.step',
            defaultValue: 'step-account',
            rules: ['in:step-password'] // https://www.npmjs.com/package/validatorjs
          }
        },
        rebind: [{
          set: 'props.label',
          get: {
            store: {
              path: 'user.login.form.account'
            }
          }
        }],
        events: {
          click: [{
            store: {
              type: 'commit',
              path: 'user/changeState',
              params: {
                state: 'login.step',
                value: 'step-account'
              }
            }
          }]
        }
      }]
    }, {
      type: 'q-card-section',
      childrens: [{
        type: 'transition',
        properties: {
          props: {
            name: 'slide-fade',
            mode: 'out-in'
          }
        },
        childrens: [{
          type: 'q-input',
          ref: 'account',
          key: 'account-input',
          properties: {
            class: 'no-padding',
            props: {
              outlined: true,
              'lazy-rules': true
            },
            attrs: {
              id: 'account'
            }
          },
          render: {
            store: {
              type: 'state',
              path: 'user.login.step',
              rules: ['in:step-account'] // https://www.npmjs.com/package/validatorjs
            }
          },
          rebind: [{
            set: 'props.label',
            get: {
              i18n: {
                path: 'message.login.input.account'
              }
            }
          }, {
            set: 'props.value',
            get: {
              store: {
                type: 'state',
                path: 'user.login.form.account'
              }
            }
          }, {
            set: 'props.rules',
            get: {
              rules: {
                validations: { // https://www.npmjs.com/package/validatorjs
                  and: ['required', 'min:8', 'email'],
                  or: ['required', 'alpha_num']
                },
                message: {
                  i18n: {
                    path: 'input.error'
                  }
                }
              }
            }
          }],
          events: {
            input: [{
              store: {
                type: 'commit',
                path: 'user/changeState',
                params: {
                  state: 'login.form.account',
                  value: '$value'
                }
              }
            }],
            keyup: [{
              key: 'enter',
              ref: {
                on: 'btn.sendAccount',
                action: 'click'
              }
            }]
          }
        }, {
          type: 'q-input',
          key: 'password-input',
          ref: 'password-input',
          properties: {
            class: 'no-padding',
            props: {
              outlined: true
            },
            attrs: {
              id: 'password-input'
            }
          },
          slots: {
            append: [{
              type: 'q-icon',
              ref: 'password-icon',
              rebind: [{
                set: 'props.name',
                get: {
                  store: {
                    path: 'user.login.isPwd',
                    defaultValue: 'visibility_off'
                  }
                }
              }],
              events: {
                click: [{
                  cascade: [{
                    type: 'store',
                    config: {
                      path: 'user.login.isPwd'
                    }
                  }, {
                    type: 'conditional',
                    lastValue: true,
                    config: {
                      if: {
                        path: '$value',
                        is: 'eq',
                        to: 'visibility_off'
                      },
                      then: {
                        $return: 'visibility'
                      },
                      else: {
                        $return: 'visibility_off'
                      }
                    }
                  }, {
                    type: 'store',
                    lastValue: true,
                    config: {
                      type: 'commit',
                      path: 'user/changeState',
                      params: {
                        state: 'login.isPwd',
                        value: '$value'
                      }
                    }
                  }]
                }]
              }
            }]
          },
          render: {
            store: {
              type: 'state',
              path: 'user.login.step',
              rules: ['in:step-password'] // https://www.npmjs.com/package/validatorjs
            }
          },
          rebind: [{
            set: 'props.label',
            get: {
              i18n: {
                path: 'message.login.input.password'
              }
            }
          }, {
            set: 'props.type',
            get: {
              cascadeImediate: [{
                type: 'store',
                config: {
                  path: 'user.login.isPwd',
                  defaultValue: 'visibility_off'
                }
              }, {
                type: 'conditional',
                lastValue: true,
                config: {
                  if: {
                    path: '$value',
                    is: 'eq',
                    to: 'visibility_off'
                  },
                  then: {
                    $return: 'password'
                  },
                  else: {
                    $return: 'text'
                  }
                }
              }]
            }
          }, {
            set: 'props.value',
            get: {
              store: {
                path: 'user.login.form.password'
              }
            }
          }, {
            set: 'props.rules',
            get: {
              rules: {
                validations: {
                  and: ['required']
                }, // https://www.npmjs.com/package/validatorjs
                message: {
                  i18n: {
                    path: 'input.error'
                  }
                }
              }
            }
          }],
          events: {
            input: [{
              store: {
                type: 'commit',
                path: 'user/changeState',
                params: {
                  state: 'login.form.password',
                  value: '$value'
                }
              }
            }],
            keyup: [{
              key: 'enter',
              ref: {
                on: 'btn.sendPassword',
                action: 'click'
              }
            }]
          }
        }]
      }, {
        type: 'div',
        properties: {
          class: 'q-mt-md'
        },
        childrens: [{
          type: 'a',
          properties: {
            class: 'text-primary',
            style: 'text-decoration: none',
            domProps: {
              href: 'https://www.npmjs.com/package/validatorjs',
              target: '_blank'
            }
          },
          rebind: [{
            set: 'domProps.innerHTML',
            get: {
              i18n: {
                path: 'message.login.forgot'
              }
            }
          }]
        }]
      }, {
        type: 'q-card-section',
        properties: {
          class: 'row justify-end no-padding q-mt-sm'
        },
        childrens: [{
          type: 'q-btn',
          key: 'btn-sendAccount',
          ref: 'btn.sendAccount',
          render: {
            store: {
              type: 'state',
              path: 'user.login.step',
              rules: ['in:step-account'] // https://www.npmjs.com/package/validatorjs
            }
          },
          properties: {
            props: {
              color: 'primary'
            },
            class: 'q-pl-lg q-pr-lg'
          },
          rebind: [{
            set: 'props.label',
            get: {
              i18n: {
                path: 'btn.next'
              }
            }
          }, {
            set: 'props.loading',
            get: {
              store: {
                path: 'user.login.loading',
                defaultValue: false
              }
            }
          }],
          events: {
            click: [{
              cascade: [{
                type: 'store',
                config: {
                  type: 'commit',
                  path: 'user/changeState',
                  params: {
                    state: 'login.loading',
                    value: true
                  }
                }
              }, {
                type: 'validate'
              }, {
                type: 'store',
                config: {
                  type: 'dispatch',
                  path: 'global/simulateLogin'
                }
              }, {
                type: 'store',
                config: {
                  type: 'commit',
                  path: 'user/changeState',
                  params: {
                    state: 'login.step',
                    value: 'step-password'
                  }
                }
              }, {
                type: 'store',
                execOnError: true,
                config: {
                  type: 'commit',
                  path: 'user/changeState',
                  params: {
                    state: 'login.loading',
                    value: false
                  }
                }
              }]
            }]
          }
        }, {
          type: 'q-btn',
          key: 'btn-sendPassword',
          ref: 'btn.sendPassword',
          render: {
            store: {
              type: 'state',
              path: 'user.login.step',
              rules: ['in:step-password'] // https://www.npmjs.com/package/validatorjs
            }
          },
          properties: {
            class: 'q-pl-lg q-pr-lg',
            props: {
              color: 'primary'
            }
          },
          rebind: [{
            set: 'props.label',
            get: {
              i18n: {
                path: 'btn.next'
              }
            }
          }, {
            set: 'props.loading',
            get: {
              store: {
                path: 'user.login.loading'
              }
            }
          }],
          events: {
            click: [{
              cascade: [{
                type: 'store',
                config: {
                  type: 'commit',
                  path: 'user/changeState',
                  params: {
                    state: 'login.loading',
                    value: true
                  }
                }
              }, {
                type: 'validate',
                config: {
                  refs: [ 'password-input' ]
                }
              }, {
                type: 'store',
                config: {
                  type: 'dispatch',
                  path: 'global/simulateLogin'
                }
              }, {
                type: 'store',
                config: {
                  type: 'commit',
                  path: 'user/changeState',
                  params: {
                    state: 'login.form.account',
                    value: ''
                  }
                }
              }, {
                type: 'store',
                config: {
                  type: 'commit',
                  path: 'user/changeState',
                  params: {
                    state: 'login.form.password',
                    value: ''
                  }
                }
              }, {
                type: 'store',
                config: {
                  type: 'commit',
                  path: 'user/changeState',
                  params: {
                    state: 'login.step',
                    value: 'step-account'
                  }
                }
              }, {
                type: 'router',
                config: {
                  path: '/'
                }
              }, {
                type: 'store',
                execOnError: true,
                config: {
                  type: 'commit',
                  path: 'user/changeState',
                  params: {
                    state: 'login.loading',
                    value: false
                  }
                }
              }]
            }]
          }
        }]
      }]
    }]
  }]
}
