import Dashboard from "../components/Dashboard.vue";
import Webhooks from "../components/webhooks/Webhooks.vue";
import Accounts from "../components/settings/Accounts.vue";
import Customize from "../components/settings/Customizer.vue";

import Instance from "../components/instances/Instance.vue";
import Instances from "../components/instances/Instances.vue";

import { createRouter, createWebHistory } from "vue-router";

const env = (import.meta as any).env;
const router = createRouter({
  history: createWebHistory(env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Dashboard,
    },
    {
      path: "/instances",
      component: Instances,
    },
    {
      path: "/webhooks",
      component: Webhooks,
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
