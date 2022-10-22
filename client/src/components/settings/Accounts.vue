<script lang="ts">
import Account from "@/components/settings/AccountBox.vue";
import CreateAccount from "@/components/screen/CreateAccount.vue";
import Config from "../../config";

export default {
  components: { Account, CreateAccount },
  data() {
    return {
      users: [],
      VisibleDisplay: false,
      localStorage: localStorage,
    };
  },

  methods: {
    FetchAccounts() {
      fetch(`${Config.server}/users/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.users = data.Data || [];
        })
        .catch((err) => {
          throw err;
        });
    },
  },

  mounted() {
    this.FetchAccounts();
  },
};
</script>

<template>
  <main class="">
    <section class="mt-5">
      <div class="grid grid-cols-2 items-center">
        <h2 class="text-xl font-semibold">Users</h2>
        <div>
          <button
            v-on:click="
              () => {
                VisibleDisplay = true;
              }
            "
            :class="`rounded-lg float-right w-full lg:w-auto lg:px-12 py-3 bg-gradient-to-r from-${localStorage.theme}-300 to-${localStorage.theme}-500`"
          >
            Create
          </button>

          <div>
            <CreateAccount
              :Visible="VisibleDisplay"
              :onCrossed="
                () => {
                  VisibleDisplay = false;
                }
              "
            ></CreateAccount>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-5 w-full">
        <Account
          v-for="user in (users as any)"
          :key="user"
          :accountId="user.id"
          :isAdmin="user.isAdmin"
          :username="user.username"
          :onDelete="FetchAccounts"
        ></Account>
      </div>
    </section>
  </main>
</template>
