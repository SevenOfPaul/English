import { createWebHistory, createRouter } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      component: () => import("./Home.vue"),
      children: [
       
      ],
    },
    {
      path: "/transform",
      component: () => import("./Transform.vue"),
    },
  ],
});
export default router;
