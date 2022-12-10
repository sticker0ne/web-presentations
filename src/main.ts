import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";

import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-purple/theme.css";
import "primevue/resources/primevue.min.css";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

app.mount("#app");
