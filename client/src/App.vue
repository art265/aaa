<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Sidebar from "./components/sidebar/Sidebar.vue";
import config from "./config";

export default {
  components: {
    Sidebar,
    RouterLink,
    RouterView,
  },

  methods: {
    Login() {
      fetch(`${config.server}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.$router.push("/");
          if (data.Success == true) {
            localStorage.setItem("token", data.Data.Token);
            window.location.reload();
          }
        });
    },
  },

  data() {
    return {
      me: {
        username: "",
        password: "",
      },
      username: "",
      password: "",
      localStorage: localStorage,
    };
  },
  mounted() {
    const token = localStorage.token;
    if (token != null) {
      fetch(`${config.server}/me`, {
        method: "GET",
        headers: {
          token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.Success != true) {
            localStorage.removeItem("token");
            window.location.reload();
          } else {
            this.me = data.Data;
          }
        });
    }
  },
};
</script>

<template :class="`bg-${localStorage.theme}-500`">
  <main>
    <section v-if="localStorage.token != null">
      <div class="px-5">
        <div
          :class="`py-1 bg-gradient-to-b from-${localStorage.theme}-300 to-${localStorage.theme}-500 rounded-b`"
        ></div>
      </div>
      <div class="grid-cols-12 grid">
        <div class="col-span-2">
          <Sidebar :username="me.username" />
        </div>
        <div class="col-span-10 mr-5">
          <RouterView :style="`animation: fade-in .25s ease-in`" />
        </div>
      </div>

      <div class="px-5">
        <div
          :class="`py-1 bg-gradient-to-b from-${localStorage.theme}-300 to-${localStorage.theme}-500 rounded-t`"
        ></div>
      </div>
    </section>

    <section
      v-if="localStorage.token == null"
      :class="`flex flex-wrap px-4 justify-center h-screen items-center`"
    >
      <div class="w-4/12">
        <div
          :class="`w-full space-y-3 text-sm bg-steel-400 p-5 rounded-lg text-gray-300`"
        >
          <div class="grid grid-cols-1">
            <label for="">Username/Email</label>
            <input
              type="text"
              placeholder="John"
              :bind="username"
              :class="`bg-steel-300 rounded-lg p-3`"
              @input="
                (event) => {
                  username = (event.target as HTMLInputElement).value;
                }
              "
            />
          </div>
          <div class="grid grid-cols-1">
            <label for="">Password</label>
            <input
              type="text"
              :value="password"
              placeholder="******"
              :class="`bg-steel-300 rounded-lg p-3`"
              @input="
                (event) => {
                  password = (event.target as HTMLInputElement).value;
                }
              "
            />
          </div>
          <div>
            <button
              v-on:click="Login"
              :class="`rounded-lg w-full lg:w-auto lg:px-12 py-3 bg-gradient-to-r from-${localStorage.theme}-300 to-${localStorage.theme}-500`"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
