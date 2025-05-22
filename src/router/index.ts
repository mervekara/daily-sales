import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "../components/auth/LoginView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
