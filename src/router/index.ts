import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_CONTEXT_PATH),
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '',
      component: () => import("@/views/ViewLayout.vue"),
      children: [
        {
          path: '/home',
          component: () => import("@/views/ViewHome.vue")
        },
        {
          path: '/project',
          component: () => import("@/views/ViewProject.vue")
        }
      ]
    },

  ]
});