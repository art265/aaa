<style lang="scss">
@import "@/assets/scss/index.scss";
@import "@/assets/scss/tailwinds.scss";
</style>

<script>
import { RouterLink, RouterView } from "vue-router";
import Sidebar from "@/components/Sidebar.vue";
export default {
  components: {
    Sidebar,
    RouterLink,
    RouterView,
  },
  data() {
    return {
      localStorage: localStorage,
    };
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
          <Sidebar />
        </div>
        <div class="col-span-10 mr-5">
          <RouterView />
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
              :class="`bg-steel-300 rounded-lg p-3`"
            />
          </div>
          <div class="grid grid-cols-1">
            <label for="">Password</label>
            <input
              type="text"
              placeholder="******"
              :class="`bg-steel-300 rounded-lg p-3`"
            />
          </div>
          <div>
            <button
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
