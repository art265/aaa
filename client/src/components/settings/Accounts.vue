<script>
import Account from "@/components/settings/AccountBox.vue";
import CreateAccount from "@/components/screen/CreateAccount.vue";

export default {
  components: { Account, CreateAccount },
  data() {
    return {
      VisibleDisplay: false,
      localStorage: localStorage,
    };
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
      <div class="grid grid-cols-5 gap-5 w-full">
        <Account />
        <Account />
        <Account />
        <Account />
        <Account />
      </div>
    </section>
  </main>
</template>
