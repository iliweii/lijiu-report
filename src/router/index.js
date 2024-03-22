import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/login/LoginLoading.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginIndex.vue')
  },
  {
    path: '/report',
    name: 'report',
    component: () => import('@/views/report/ReportIndex.vue'),
    meta: {
      keepAlive: true, // 添加 keepAlive 标记
      tabbar: true, // 添加 tabbar 标记
    },
  },
  {
    path: '/report-edit',
    name: 'reportEdit',
    component: () => import('@/views/report/ReportEdit.vue'),
    meta: {
      keepAlive: true, // 添加 keepAlive 标记
    },
  },
  {
    path: '/report-expense',
    name: 'reportExpense',
    component: () => import('@/views/report/ReportExpense.vue'),
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('@/views/mine/MineIndex.vue'),
    meta: {
      keepAlive: true, // 添加 keepAlive 标记
      tabbar: true, // 添加 tabbar 标记
    },
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('@/views/sign/index.vue')
  },
  {
    path: '/sign/userinfo',
    name: 'signUserinfo',
    component: () => import('@/views/sign/userinfo.vue')
  },
  {
    path: '/sign/chatroom',
    name: 'signChatroom',
    component: () => import('@/views/sign/chatroom.vue')
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    component: () => import('@/views/admin/login.vue')
  },
  {
    path: '/admin',
    name: 'adminIndex',
    component: () => import('@/views/admin/index.vue')
  },
  {
    path: '/admin/peopleList',
    name: 'adminPeopleList',
    component: () => import('@/views/admin/peopleList.vue')
  },
  {
    path: '/admin/winnerList',
    name: 'adminWinnerList',
    component: () => import('@/views/admin/winnerList.vue')
  },
  {
    path: '/admin/lottery',
    name: 'adminLottery',
    component: () => import('@/views/admin/lottery.vue')
  },
  {
    path: '/admin/lottery2',
    name: 'adminLottery2',
    component: () => import('@/views/admin/lottery2.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
