import { createApp } from "vue";

import router from "../src/router/index";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { useUserStore } from "./pinia/user.pinia.ts";

const app = createApp(App);

app.use(router);
app.use(createPinia());

// initialize the user
const userStore = useUserStore();
userStore.initializeAuthListener();

app.mount("#app");
