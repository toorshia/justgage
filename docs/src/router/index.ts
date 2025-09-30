import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/playground',
      name: 'playground',
      component: () => import('@/views/PlaygroundView.vue')
    },
    {
      path: '/docs',
      name: 'docs',
      component: () => import('@/views/DocsView.vue')
    }
  ]
})

export default router
