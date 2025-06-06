import { createRouter, createWebHistory } from 'vue-router'
import AboutPage from '@/pages/AboutPage.vue'
import MapPage from '@/pages/MapPage.vue'

export interface RouteParams {
  id?: string;
}

const router = createRouter({
  history: createWebHistory('/map-markers/'),
  routes: [
    {
      path: '/',
      name: 'about',
      component: AboutPage,
    },
    {
      path: '/map',
      name: 'map',
      component: MapPage,
      children: [
        {
          path: ':id',
          name: 'map-marker',
          component: MapPage,
          props: true,
        },
      ],
    },
  ],
})

export default router
