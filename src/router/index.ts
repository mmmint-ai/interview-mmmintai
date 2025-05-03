import { createRouter, createWebHistory } from 'vue-router'
import ChallengeOne from '../views/ChallengeOne.vue'
import ChallengeTwo from '../views/ChallengeTwo.vue'
import LibraryView from '../views/LibraryView.vue'
import DamageProcessView from '../views/DamageProcessView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'challenge1',
      component: ChallengeOne,
    },
    {
      path: '/challenge2',
      name: 'challenge2',
      component: ChallengeTwo,
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryView,
    },
    {
      path: '/damageprocess',
      name: 'damageprocess',
      component: DamageProcessView
    },
  ],
})

export default router
