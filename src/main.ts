import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";

import "./style.css";
import LoginView from "./components/auth/LoginView.vue";
import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";
import Dashboard from "./components/sales/Dashboard.vue";

import VueApexCharts from "vue3-apexcharts";

const routes = [
  { path: "/login", component: LoginView },
  { path: "/daily-sales", component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(store);
app.use(router);
app.component("ApexChart", VueApexCharts);

app.mount("#app");
