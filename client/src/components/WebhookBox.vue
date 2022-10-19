<script>
import utils from "@/assets/js/utils";
import config from "../config";

const Colors = utils.getThemeColors();
const themeColorRevert =
  (utils.changeHue(Colors[localStorage.theme], 180) || "").replace("#", "") ||
  "000000";

export default {
  props: {
    onDeleteButtonClicked: {
      type: Function,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
    },

    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      utils: utils,
      themeColorRevert: themeColorRevert,
      color: this.active === true ? `emerald` : `flush`,
    };
  },

  methods: {
    TestWebhook() {
      fetch(`${config.server}/webhooks/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify({
          webhook_id: this.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.Success) {
          }
        });
    },
  },
};
</script>

<template>
  <section
    class="w-full rounded-lg bg-gradient-to-b from-steel-300 to-steel-400 p-5"
  >
    <section>
      <div>
        <div class="grid grid-cols-2">
          <div class="flex flex-wrap text-winkle-300 items-center space-x-3">
            <!-- <div :v-if="active != null">
              <div
                :class="`bg-${color} bg-opacity-50
                border border-${color}
                p-1.5
                rounded-full`"
              ></div>
            </div> -->
            <div>{{ title }}</div>
          </div>
          <div class="space-x-1">
            <div class="px-1 space-x-1">
              <button
                v-on:click="onDeleteButtonClicked"
                :class="`bg-flush ml-2  bg-opacity-50 float-right px-3 text-xs py-1 rounded border-flush border`"
              >
                Delete
              </button>
              <button
                v-on:click="TestWebhook"
                :class="`bg-blue ml-2  bg-opacity-50 float-right px-3 text-xs py-1 rounded border-blue border`"
              >
                Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
