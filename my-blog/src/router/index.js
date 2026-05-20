import { createRouter, createWebHashHistory } from "vue-router";
import NotFound from "@/views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
    meta: { title: "The Daily Read — Home" },
  },
  {
    path: "/post/:id",
    name: "PostDetail",
    component: () => import("@/views/PostDetail.vue"),
    meta: { title: "The Daily Read — Story" },
    beforeEnter: (to) => {
      const id = Number(to.params.id);
      if (!Number.isInteger(id) || id < 1 || id > 100) {
        return {
          name: "NotFound",
          params: { pathMatch: to.path.split("/").slice(1) },
        };
      }
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: { title: "The Daily Read — Page Not Found" },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0, behavior: "smooth" };
  },
});

router.afterEach((to) => {
  document.title = to.meta?.title || "The Daily Read";
});

export default router;
