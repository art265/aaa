<script lang="ts">
import DiscordImage from "../../assets/imgs/discord.png";
import utils from "../../assets/js/utils";
import config from "../../config";
import toast from "../toast";

const Colors = utils.getThemeColors();
const themeColorRevert =
  (utils.changeHue((Colors as any)[localStorage.theme], 180) || "").replace(
    "#",
    ""
  ) || "000000";

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
      DiscordImage: DiscordImage,
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
          if (data.Success) {
            toast.$success(data.Message);
          } else {
            toast.$failure(data.Message);
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
        <div class="items-center grid grid-cols-2">
          <div class="flex flex-wrap text-winkle-300 space-x-3 items-center">
            <!-- <div :v-if="active != null">
              <div
                :class="`bg-${color} bg-opacity-50
                border border-${color}
                p-1.5
                rounded-full`"
              ></div>
            </div> -->
            <img :src="DiscordImage" class="object-cover w-8 h-8" />
            <div>{{ title }}</div>
          </div>
          <div class="space-x-1">
            <div class="px-1 space-x-1">
              <button
                v-on:click="
                  () => {
                    onDeleteButtonClicked();
                  }
                "
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
