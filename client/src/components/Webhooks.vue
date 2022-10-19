<script>
import Box from "@/components/WebhookBox.vue";
import CreateWebhook from "@/components/screen/CreateWebhook.vue";
import config from "../config";

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
        console.log(this.webhooks);
      })
      .catch((err) => {
        throw err;
      });
  },

  methods: {
    DeleteWebhook(webhook_id) {
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
            window.location.reload();
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
            v-for="hook in webhooks"
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
      :class="`w-full bg-steel-400 capitalize text-center rounded-lg p-5`"
    >
      <h1 :class="`text-base text-gray-400`">You got no Discord webhook(s)</h1>
    </section>
  </main>
</template>
