<script lang="ts">
import Python from "../assets/imgs/python.png";
import Node from "../assets/imgs/node.png";

export default {
  components: { Python, Node },
  methods: {},

  props: {
    Name: {
      type: String,
      required: true,
    },

    Description: {
      type: String,
    },

    onClickLocation: {
      type: String,
      required: true,
    },

    Type: String,
  },

  data() {
    return {
      localStorage: localStorage,
      Image:
        (this.Type || "").toLowerCase() === "node"
          ? Node
          : (this.Type || "").toLowerCase() === "python"
          ? Python
          : null,
    };
  },
};
</script>

<template>
  <main
    class="w-full rounded-lg bg-gradient-to-b from-steel-300 to-steel-400 bg-pos-0 hover:bg-pos-100 duration-500 bg-size-200 transition-all p-5"
  >
    <section>
      <div>
        <div class="grid-cols-2 grid items-center">
          <div class="flex flex-wrap text-winkle-300 items-center space-x-3">
            <div>
              <img :src="Image" class="w-10 h-10" />
            </div>
            <div>
              <h2>{{ Name }}</h2>
              <h2 class="text-xs text-slate-400">
                {{ Description }}
              </h2>
            </div>
          </div>
          <router-link :to="onClickLocation">
            <button
              v-on:click="() => {}"
              :class="`float-right shadow text-white rounded-lg w-full lg:w-auto lg:px-11 py-3 bg-gradient-to-r from-${localStorage.theme}-300 to-${localStorage.theme}-500`"
            >
              Manage
            </button>
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>
