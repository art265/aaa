<script lang="ts">
import Dropdown from "./SidebarDropdown.vue";
import URL from "./SidebarLinkTag.vue";

export default {
  components: { URL, Dropdown },

  props: {
    username: String,
  },

  data() {
    return {
      localStorage: localStorage,
      SettingsDropdownData: [
        {
          name: "Accounts",
          icon: "fa-solid fa-users",
          href: "/settings/accounts",
        },
        {
          name: "Customize Panel",
          icon: "fa-solid fa-pen-nib",
          href: "/settings/customize",
        },
      ],
    };
  },

  methods: {
    welcomeMessage() {
      let date = new Date();
      let hook = date.getHours() < 12 ? "Good Morning" : "Good Afternoon";
      return hook;
    },

    changeTheme(theme: number) {
      this.localStorage.theme = theme;
    },
  },
};
</script>

<template>
  <main>
    <section class="p-5 text-gray-50">
      <div
        :class="`
          p-3
          h-screen
          w-full
          bg-gradient-to-b
          from-${localStorage.theme}-300
          to-${localStorage.theme}-500
          rounded-lg
        `"
      >
        <section
          class="flex w-full items-center bg-opacity-10 p-2.5 rounded-lg bg-white"
        >
          <h2 class="">
            {{ welcomeMessage() }},
            <strong class="capitalize">{{ username }}</strong>
          </h2>
        </section>

        <section class="space-y-2 mt-3">
          <URL href="/" name="Dashboard" icon="fa-solid fa-chart-simple" />
          <URL href="/instances" name="Instances" icon="fa-solid fa-server" />
          <URL href="/webhooks" name="Webhooks" icon="fa-solid fa-signs-post" />
          <Dropdown
            name="Settings"
            icon="fa-solid fa-screwdriver-wrench"
            :children="SettingsDropdownData"
          />
        </section>
      </div>
    </section>
  </main>
</template>
