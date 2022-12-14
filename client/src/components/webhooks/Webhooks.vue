<script lang="ts">
import CreateWebhook from "@/components/screen/CreateWebhook.vue";
import Box from "./WebhookBox.vue";
import config from "../../config";
import toast from "../toast";

export default {
  components: { Box, CreateWebhook },

  data() {
    return {
      webhooks: [],
      localStorage: localStorage,
      VisibleDisplay: false,
    };
  },

  mounted() {
    this.FetchMyWebhooks();
  },

  methods: {
    FetchMyWebhooks() {
      fetch(`${config.server}/webhooks/by/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.webhooks = data.Data || [];
        })
        .catch((err) => {
          throw err;
        });
    },

    DeleteWebhook(webhook_id: string) {
      fetch(`${config.server}/webhooks/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify({
          webhook_id: webhook_id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.Success) {
            toast.$success(data.Message);
            this.FetchMyWebhooks();
          } else {
            toast.$failure(data.Message);
          }
        })
        .catch((err) => {
          throw err;
        });
    },
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
              v-on:click="
                () => {
                  VisibleDisplay = true;
                }
              "
              :class="`rounded-lg float-right w-full lg:w-auto lg:px-12 py-3 bg-gradient-to-r from-${localStorage.theme}-300 to-${localStorage.theme}-500`"
            >
              Create
            </button>
            <div>
              <CreateWebhook
                :reFetchWebhooks="FetchMyWebhooks"
                :Visible="VisibleDisplay"
                :onCrossed="
                  () => {
                    VisibleDisplay = false;
                  }
                "
              ></CreateWebhook>
            </div>
          </div>
        </div>
        <section class="space-y-3">
          <Box
            v-for="hook in (webhooks as any)"
            :key="hook"
            :id="hook.id"
            :title="hook.webhook_url"
            :onDeleteButtonClicked="
              () => {
                DeleteWebhook(hook.id);
              }
            "
          />
        </section>
      </div>
    </section>
    <section
      v-if="webhooks.length == 0"
      :class="`w-full bg-steel-400 capitalize text-center rounded-lg p-5`"
    >
      <h1 :class="`text-base text-gray-400`">You got no Discord webhook(s)</h1>
    </section>
  </main>
</template>
