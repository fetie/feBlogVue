import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: {title: '首页'}
  },
  {
    path: '/category/:cate',
    name: 'category',
    component: () => import('../views/Home.vue'),
    meta: {title: '分类', params: 'cate'}
  },
  {
    path: '/search',
    redirect:'/'
  },
  {
    path: '/search/:words',
    name: 'search',
    component: () => import('../views/Home.vue'),
    meta: {title: '搜索', params: 'words'}
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
    meta: {title: '关于'}
  },
  {
    path: '/friend',
    name: 'friend',
    component: () => import('../views/Friend.vue'),
    meta: {title: '友链'}
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('../views/Articles.vue'),
    meta: {title: '文章'}
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
