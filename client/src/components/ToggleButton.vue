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

    OffText: {
      type: String,
      default: "Off",
    },

    OnText: {
      type: String,
      default: "On",
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
    <div v-if="On === true"></div>
    <div
      :class="`${ClassName} rounded-lg text-center items-center flex justify-center uppercase font-semibold bg-gradient-to-r from-${localStorage.theme}-300 to-${localStorage.theme}-500`"
    >
      {{ On === true ? OnText : OffText }}
    </div>
  </div>
</template>
