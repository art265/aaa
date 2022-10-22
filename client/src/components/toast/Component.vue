<script lang="ts">
export default {
  name: "Toast",

  props: {
    Type: {
      type: String,
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
      TypeToColor(type: string | undefined) {
        switch (type) {
          case "Success":
            return "green";
          case "Error":
            return "red";
          case "Warning":
            return "yellow";
          case "Info":
            return "blue";
          default:
            return "gray";
        }
      },
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
          :class="`relative  rounded-lg bg-gradient-to-r from-${TypeToColor(
            Type
          )}-300 to-${TypeToColor(Type)}-500 drop-shadow-lg`"
        >
          <p class="text-sm space-x-2 px-5 py-4">
            <span v-if="Type == 'Success'"
              ><i class="fa-solid fa-check"></i
            ></span>
            <span v-if="Type == 'Failure'"
              ><i class="fa-solid fa-xmark"></i
            ></span>
            <span v-if="Type == 'Warning'">
              <i class="fa-regular fa-circle-exclamation"></i>
            </span>
            <span v-if="Type == 'Info'">
              <i class="fa-sharp fa-solid fa-exclamation"></i>
            </span>

            <span>{{ Message }}</span>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
