import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
export const routerChildren: RouteRecordRaw[] = [
  {
    path: '/home',
    component: () => import('@/views/ViewHome.vue'),
    meta: {
      lineConfig: {
        bottom: {},
        right: {},
      },
    },
  },
  {
    path: '/project',
    component: () => import('@/views/ViewProject.vue'),
    meta: {
      lineConfig: {
        top: {},
        right: {},
      },
    },
  },
  {
    path: '/character', //角色橱窗
    component: () => import('@/views/ViewCharacter.vue'),
    meta: {
      lineConfig: {
        top: {},
        right: {},
      },
    },
  },
]
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: () => import('@/views/ViewLayout/Index.vue'),
    children: routerChildren,
  },
]
export default createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_CONTEXT_PATH),
  routes,
});