import App from "./App.vue";
import router from "./router";
import utils from "./assets/js/utils";

import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

import "@/assets/scss/index.scss";
import "@/assets/scss/tailwinds.scss";

import { createApp } from "vue";

const app = createApp(App);
const ToastOptions: PluginOptions = {};

app.use(router);
app.use(Toast, ToastOptions);
app.mount("#app");

utils.loadThemeScrollBar();
utils.setDefaultTheme("blue");

utils.appendJs([
  `https://unicons.iconscout.com/release/v4.0.0/script/monochrome/bundle.js`,
  `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js`,
]);

utils.appendCss([
  `https://unicons.iconscout.com/release/v4.0.0/css/solid.css`,
  `https://unicons.iconscout.com/release/v4.0.0/css/line.css`,
  `https://unicons.iconscout.com/release/v4.0.0/css/thinline.css`,
  `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css`,
]);
