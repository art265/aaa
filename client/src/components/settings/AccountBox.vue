<script lang="ts">
import ManageAccount from "@/components/screen/ManageAccount.vue";
import config from "@/config";

export default {
  components: { ManageAccount },

  props: {
    username: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
    },

    accountId: {
      type: String,
      required: true,
    },
  },

  methods: {
    onClickDelete(account_id: string) {
      fetch(`${config.server}/users/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify({
          user_id: account_id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.Success) {
            window.location.reload();
          }
        })
        .catch((err) => {
          throw err;
        });
    },
  },

  data() {
    return {
      VisibleDisplay: false,
      localStorage: localStorage,
    };
  },
};
</script>

<template>
  <main>
    <div class="gap-3 mt-3 grid">
      <div
        :class="`w-full rounded-lg p-3 bg-gradient-to-b from-steel-300 to-steel-400 `"
      >
        <div>
          <h3 class="flex items-center space-x-1">
            <span> {{ username }} </span>
            <span> - </span>
            <span
              :class="`text-transparent bg-clip-text bg-gradient-to-r from-${localStorage.theme}-300 to-${localStorage.theme}-500`"
            >
              {{ isAdmin == true ? "Admin" : "User" }}
            </span>
          </h3>
          <h3 class="flex flex-wrap items-center space-x-1"></h3>
        </div>
        <div class="grid-cols-5 gap-2 grid">
          <button
            v-on:click="
              () => {
                VisibleDisplay = true;
              }
            "
            :class="`col-span-4 mt-3 rounded-lg float-right w-full py-3 bg-gradient-to-r from-${localStorage.theme}-300 to-${localStorage.theme}-500`"
          >
            Manage
          </button>
          <button
            v-on:click="onClickDelete(accountId)"
            :class="`mt-3 rounded-lg float-right w-full py-3 bg-steel-200`"
          >
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
        <ManageAccount
          :Visible="VisibleDisplay"
          :onCrossed="
            () => {
              VisibleDisplay = false;
            }
          "
        ></ManageAccount>
      </div>
    </div>
  </main>
</template>
