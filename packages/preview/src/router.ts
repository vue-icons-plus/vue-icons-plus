import { createRouter, createWebHistory } from 'vue-router'

export const routerHistory = createWebHistory()
export const router = createRouter({
  history: routerHistory,
  strict: true,
  routes: [
    {
      path: '/', redirect: '/icons/',
    },
    {
      path: '/icons/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      props: true,
    },
    {
      path: '/icons/:id',
      name: 'icons',
      component: () => import('./views/Icons.vue'),
      meta: { transition: 'slide-left' },
      props: true
    },
    {
      path: '/icons/search/',
      name: 'search',
      component: () => import('./views/SearchView.vue'),
      meta: { transition: 'slide-left' },
    }
  ]
})
