import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/HelloUCLARO'),
    props: true
  },
  {
    path: '/decay',
    name: 'decay',
    component: () => import('../components/DecayTable')
  },
  {
    path: '/tg43',
    name: 'tg43',
    component: () => import('../components/TG43')
  },
  {
    path: '/pqreporter',
    name: 'pqreporter',
    component: ()=> import('../components/PlanQualityReporter')
  },
  {
    path: '/pqexplorer',
    name: 'pqexplorer',
    component: ()=> import('../components/PlanQualityExplorer')
  },
  {
    path: '/tlog',
    name: 'tlog',
    component: () => import('../components/TLog')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../components/Settings')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router