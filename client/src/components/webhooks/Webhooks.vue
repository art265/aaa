<script lang="ts">
import CreateWebhook from "@/components/screen/CreateWebhook.vue";
import Toast from "../screen/Toast.vue";
import Box from "./WebhookBox.vue";
import config from "../../config";

export default {
  components: { Box, CreateWebhook, Toast },

  data() {
    return {
      webhooks: [],
      localStorage: localStorage,
      VisibleDisplay: false,
      Toast: {
        Message: "",
        Show: false,
        Success: false,
        Fire(message: string, success: boolean, timeout = 3000) {
          this.Message = message;
          this.Success = success;
          this.Show = true;

          setTimeout(() => {
            this.Show = false;
          }, timeout);
        },
      },
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
          this.Toast.Fire(data.Message, data.Success);
          if (data.Success) {
            this.FetchMyWebhooks();
          }
        })
        .catch((err) => {
          throw err;
        });
    },

    FireToast: function (message: string, success: boolean, timeout = 3000) {
      this.Toast.Fire(message, success, timeout);
    },
  },
};
</script>

<template>
  <main class="">
    <Toast
      :Show="Toast.Show"
      :Success="Toast.Success"
      :Message="Toast.Message"
    />
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
