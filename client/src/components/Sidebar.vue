<script>
import URL from "@/components/SidebarLinkTag.vue";
import Dropdown from "@/components/SidebarDropdown.vue";

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

    changeTheme(theme) {
      this.localStorage.theme = theme;
    },
  },
};
</script>

<template>
  <main>
    <section class="p-5">
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
          class="flex items-center bg-opacity-10 p-2.5 rounded-lg bg-white"
        >
          <h2 class="">
            {{ welcomeMessage() }},
            <strong class="capitalize">{{ username }}</strong>
          </h2>
        </section>
        <section class="space-y-2 mt-3">
          <URL href="/" name="Home" icon="fa-solid fa-earth-asia" />
          <URL href="/dashboard" name="Stats" icon="fa-solid fa-chart-simple" />
          <URL href="/webhooks" name="Webhooks" icon="fa-solid fa-list-check" />
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
