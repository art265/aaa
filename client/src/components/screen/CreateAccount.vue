<script lang="ts">
import config from "../../config";
import toast from "../toast";
import ToggleButton from "../ToggleButton.vue";

export default {
  components: { ToggleButton },

  props: {
    Visible: {
      type: Boolean,
      required: true,
    },

    onCrossed: {
      type: Function,
      required: true,
    },
  },

  methods: {
    Create() {
      // Create new user post request using fetch with json body
      fetch(`${config.server}/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify({
          admin: this.IsAdmin,
          username: this.username,
          password: this.password,
          max_webhooks: this.max_webhooks,
          max_instances: this.max_instances,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.Success) {
            toast.$success(data.Message);
            this.onCrossed();
          } else {
            toast.$failure(data.Message);
          }
        })
        .catch((err) => {
          throw err;
        });
    },
  },

  data() {
    return {
      username: "",
      password: "",
      IsAdmin: false,
      max_webhooks: 3,
      max_instances: 5,
      localStorage: localStorage,
    };
  },
};
</script>

<template>
  <div
    v-if="Visible"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto flex flex-wrap justify-center mt-20 overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <div class="relative bg-steel-400 rounded-lg shadow">
        <div
          class="flex justify-between items-start p-5 rounded-t border-b border-steel-500"
        >
          <h3 class="text-xl font-semibold text-white">Create New User</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-steel-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            v-on:click="
              () => {
                onCrossed();
              }
            "
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <div class="px-6 mt-3 text-gray-300 text-sm space-y-3">
          <div class="grid-cols-2 grid gap-3">
            <div>
              <label for="">Username</label>
              <input
                type="text"
                :value="username"
                @input="(event) => (username = (event.target as HTMLInputElement).value)"
                placeholder="John"
                :class="`w-full py-3 px-5 text-gray-300 bg-steel-300 rounded-lg`"
              />
            </div>
            <div>
              <label for="">Password</label>
              <input
                :value="password"
                @input="(event) => (password = (event.target as HTMLInputElement).value)"
                type="password"
                placeholder="******"
                :class="`w-full py-3 px-5 text-gray-300 bg-steel-300 rounded-lg`"
              />
            </div>
          </div>
          <div class="grid-cols-5 grid gap-3">
            <div class="col-span-2">
              <label for="">Max Webhooks</label>
              <input
                :value="max_webhooks"
                @input="(event) => (max_webhooks = parseInt((event.target as HTMLInputElement).value))"
                type="number"
                placeholder="3"
                :class="`w-full py-3 px-5 text-gray-300 bg-steel-300 rounded-lg`"
              />
            </div>
            <div class="col-span-2">
              <label for="">Max Instances</label>
              <input
                :value="max_instances"
                @input="(event) => (max_instances = parseInt((event.target as HTMLInputElement).value))"
                type="number"
                placeholder="100"
                :class="`w-full py-3 px-5 text-gray-300 bg-steel-300 rounded-lg`"
              />
            </div>
            <div :class="`text-gray-300 col-span-1`">
              <label for="">Admin</label>
              <ToggleButton
                :On="IsAdmin"
                ClassName="h-10"
                :onClicked="
                  () => {
                    IsAdmin = !IsAdmin;
                  }
                "
              />
            </div>
          </div>
        </div>

        <div class="flex items-center px-6 mt-4 space-x-2 rounded-b">
          <button
            v-on:click="Create"
            :class="`rounded-lg float-right w-full lg:w-auto lg:px-12 py-3 bg-gradient-to-r from-${localStorage.theme}-300 to-${localStorage.theme}-500`"
          >
            Finalize
          </button>
          <button
            :class="`rounded-lg float-right w-full lg:w-auto lg:px-8 py-3 bg-steel-300`"
            v-on:click="
              () => {
                onCrossed();
              }
            "
          >
            Close
          </button>
        </div>
        <div class="py-3"></div>
      </div>
    </div>
  </div>
</template>
