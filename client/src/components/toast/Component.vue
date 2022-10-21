<script lang="ts">
export default {
  name: "Toast",

  props: {
    Success: {
      type: Boolean,
    },

    Message: {
      type: String,
    },

    Timeout: {
      type: Number,
      default: 3000,
    },
  },

  data() {
    return {
      localStorage: localStorage,
    };
  },
};
</script>

<template>
  <div class="toast">
    <section :class="`sticky`">
      <div
        :style="`animation: fade-in-bottom .3s;`"
        :class="`slide-out-from-top fixed text-white right-10 bottom-10 `"
      >
        <div
          :class="`relative  rounded-lg bg-gradient-to-r from-${
            Success == true ? localStorage.theme : 'flush'
          }-300 to-${
            Success == true ? localStorage.theme : 'flush'
          }-500 drop-shadow-lg`"
        >
          <p class="text-sm space-x-2 px-5 py-4">
            <span v-if="Success == true"
              ><i class="fa-solid fa-check"></i
            ></span>
            <span v-if="Success == false"
              ><i class="fa-solid fa-xmark"></i
            ></span>

            <span>{{ Message }}</span>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
