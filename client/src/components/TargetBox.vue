<script>
import Node from "../assets/imgs/node.png";
import Python from "../assets/imgs/python.png";
import { RouterLink } from "vue-router";

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

    Type: "Node" | "Python",
  },

  data() {
    return {
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
  <router-link
    :to="onClickLocation"
    class="w-full rounded-lg bg-gradient-to-b from-steel-300 to-steel-400 bg-pos-0 hover:bg-pos-100 duration-500 bg-size-200 transition-all p-5"
  >
    <section>
      <div>
        <div class="">
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
        </div>
      </div>
    </section>
  </router-link>
</template>
