<script>
export default {
  props: {
    On: {
      type: Boolean,
      default: false,
    },

    ClassName: {
      type: String,
      default: "",
    },

    onClicked: {
      type: Function,
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
  <div
    class="bg-steel-300 grid grid-cols-2 rounded-lg cursor-pointer"
    v-on:click="onClicked"
  >
    <div v-if="On === false"></div>
    <div
      :class="`${ClassName} rounded-lg text-center items-center flex justify-center uppercase font-semibold bg-gradient-to-r from-${localStorage.theme}-300 to-${localStorage.theme}-500`"
    >
      {{ On === false ? "On" : "Off" }}
    </div>
  </div>
</template>
