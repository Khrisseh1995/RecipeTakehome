import Vue from 'vue'
import VueRouter from 'vue-router'
import Recipes from '../views/Recipes.vue';
import RecipePage from '../views/RecipePage.vue';



Vue.use(VueRouter)

  const routes  = [
  {
    path: '/',
    name: 'Recipes',
    component: Recipes
  },
  {
    path: '/recipe/:id',
    name: 'RecipePage',
    component: RecipePage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
