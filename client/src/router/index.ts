import ToDo from "../views/Webhooks.vue";
import HomeView from "../views/Home.vue";
import Dash from "../views/Dashboard.vue";
import Accounts from "../views/Accounts.vue";
import Instance from "../views/Instance.vue";
import Customize from "../views/Customize.vue";

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Dash,
    },
    {
      path: "/instances",
      component: HomeView,
    },
    {
      path: "/webhooks",
      component: ToDo,
    },
    {
      path: "/settings/customize",
      component: Customize,
    },
    {
      path: "/settings/accounts",
      component: Accounts,
    },
    {
      path: "/instance/:id",
      component: Instance,
    },
  ],
});

export default router;
