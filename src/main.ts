import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";
import router from "./router";
import VueApexCharts from "vue3-apexcharts";

import "./style.css";

const app = createApp(App);

app.use(store);
app.use(router);
app.component("ApexChart", VueApexCharts);

app.mount("#app");
