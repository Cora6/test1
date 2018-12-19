import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    type:'home',
    meta: {
      title: '固定收益',
      icon: 'profit',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index1',
        component: () => import('@/views/documentation/index1'),
        name: 'index1',
        meta: { title: '持仓池', noCache: true }
      },
      {
        path: 'index2',
          component: () => import('@/views/documentation/index2'),
        name: 'index2',
        meta: { title: '增仓池', noCache: true }
      },
      {
        path: 'index3',
          component: () => import('@/views/documentation/index3'),
        name: 'index3',
        meta: { title: '风险池', noCache: true }
      }
    ]
  },
  {
    path: '/documentation2',
    component: Layout,
    type:'classify',
    redirect: '/documentation2/index',
    hidden:false,
    meta: {
      title: '股票',
      icon: 'shares',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index4',
        component: () => import('@/views/documentation/index4'),
        name: 'index4',
        meta: { title: '持仓池', noCache: true }
      },
      {
        path: 'index5',
        component: () => import('@/views/documentation/index5'),
        name: 'index5',
        meta: { title: '增仓池', noCache: true }
      },
      {
        path: 'index6',
        component: () => import('@/views/documentation/index6'),
        name: 'index6',
        meta: { title: '做空池', noCache: true }
      },
      {
        path: 'index7',
        component: () => import('@/views/documentation/index7'),
        name: 'index7',
        meta: { title: '风险池', noCache: true }
      },
      {
        path: 'index8',
        component: () => import('@/views/documentation/index8'),
        name: 'index8',
        meta: { title: '打新池', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [


  { path: '*', redirect: '/404', hidden: true }
]





