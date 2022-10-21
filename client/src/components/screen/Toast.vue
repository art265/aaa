<script lang="ts">
export default {
  props: {
    Success: {
      type: Boolean,
      required: true,
    },

    Message: {
      type: String,
      required: true,
    },

    Show: {
      type: Boolean,
      required: true,
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
  <div v-if="Show" class="toast">
    <section :class="`sticky `">
      <div
        :class="`animate-out slide-out-from-top fixed text-white right-10 rounded-lg bottom-10 px-5 py-4 bg-gradient-to-r from-${
          Success == true ? localStorage.theme : 'flush'
        }-300 to-${
          Success == true ? localStorage.theme : 'flush'
        }-500 drop-shadow-lg`"
      >
        <p class="text-sm space-x-2">
          <span v-if="Success == true"><i class="fa-solid fa-check"></i></span>
          <span v-if="Success == false"><i class="fa-solid fa-xmark"></i></span>

          <span>{{ Message }}</span>
        </p>
      </div>
    </section>
  </div>
</template>
