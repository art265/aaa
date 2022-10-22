<script lang="ts">
import { Chart, registerables } from "chart.js";
import utils from "@/assets/js/utils";

Chart.register(...registerables);

export default {
  data() {
    return {
      id: utils.randomString(12),
    };
  },

  props: {
    header: String,
    type: String,
    options: Object,
    data: {
      labels: [],
      datasets: [
        {
          backgroundColor: String,
          label: String,
          data: Object,
          borderColor: String,
          borderWidth: 1,
        },
      ],
    },
  },

  mounted() {
    const Options = (this as any).options;
    const Data = (this as any).data;

    let ctx: any = document.getElementById((this as any).id);
    const chart = new Chart(ctx, {
      data: Data,
      type: (this as any).type,
      options: Options,
    });
  },
};
</script>

<template>
  <main class="w-full">
    <section class="">
      <h1>{{ header }}</h1>
      <div class="w-full flex flex-wrap p-3">
        <canvas :id="id"></canvas>
      </div>
    </section>
  </main>
</template>
