
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Doc.vue') },
      { path: 'teste/*', component: () => import('pages/Teste.vue') },
      { path: 'pedidos', component: () => import('pages/Pedidos.vue') },
      { path: 'pedido', component: () => import('pages/Pedido.vue') },
      { path: 'pedido_paulo', component: () => import('pages/Pedido_Paulo.vue') },
      { path: 'pedido_paulo/:id', component: () => import('pages/Pedido_Paulo.vue') },
      { path: 'pedido/:id', component: () => import('pages/Pedido.vue') },
      { path: 'doc', component: () => import('pages/Doc.vue') }
    ]
  },
  {
    path: '/_/',
    component: () => import('layouts/NoLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/Login.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
