import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Login from "@/components/auth/LoginView.vue";
import Dashboard from "@/components/sales/Dashboard.vue";
import { store } from "../store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/daily-sales",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const accessToken = store.state.auth.accessToken;

  const isLoggedIn = !!accessToken;

  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login");
  } else if (to.path === "/login" && isLoggedIn) {
    next("/daily-sales");
  } else {
    next();
  }
});

export default router;
