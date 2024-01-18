import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InscriptionView from '../views/Inscription.vue' 
import ConnexionView from '../views/Connexion.vue' 
import DashboardView from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: InscriptionView // Add your Inscription component
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: ConnexionView // Add your Connexion component
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView // Add your Connexion component
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
