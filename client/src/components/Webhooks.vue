<script>
import Box from "@/components/WebhookBox.vue";

export default {
  components: { Box },
  data() {
    return {
      localStorage: localStorage,
    };
  },
};
</script>

<template>
  <main class="">
    <section class="mt-5">
      <div class="grid grid-cols-1 gap-5 w-full">
        <div class="grid grid-cols-2 items-center">
          <h2 class="text-xl font-semibold">Discord Webhooks</h2>
          <div>
            <button
              :class="`rounded-lg float-right w-full lg:w-auto lg:px-12 py-3 bg-gradient-to-r from-${localStorage.theme}-300 to-${localStorage.theme}-500`"
            >
              Create
            </button>
          </div>
        </div>
        <section class="space-y-3">
          <Box />
          <Box :active="true" />
        </section>
      </div>
    </section>
  </main>
</template>
