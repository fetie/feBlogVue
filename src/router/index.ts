import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'
import { store } from '@/store'

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
    meta: {title: '推荐'}
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('../views/Articles.vue'),
    meta: {title: '文章'}
  },
  {
    path: '/guess-num',
    name: 'guessNum',
    component: () => import('../views/GuessNum.vue'),
    meta: {title: '猜数字游戏'}
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
    let title = '24k纯铁'
    if (to.meta.params){
        title = `${to.meta.title}:${to.params[to.meta.params] || ''} - ${title}`
    }else {
        title = `${to.meta.title} - ${title}`
    }
    document.title = title
    if (to.path !== from.path) {
        store.dispatch('setLoading', true);
    }
    next();
})
router.afterEach((to, from) => {
    store.dispatch('setLoading', false);
})
export default router
