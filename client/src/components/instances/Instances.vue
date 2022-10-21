<script lang="ts">
import CreateInstance from "../screen/CreateInstance.vue";
import Target from "../TargetBox.vue";
import Config from "../../config";

export default {
  components: { Target, CreateInstance },

  data() {
    return {
      localStorage,
      VisibleDisplay: false,
      instances: [
        // {
        //   name: "Instance 1",
        //   description: "This is a description",
        //   app_type: "Node",
        //   active: true,
        //   id: "1",
        // },
      ],
    };
  },

  methods: {
    Create() {},
  },

  mounted() {
    // Fetch Json
    fetch(`${Config.server}/instances/by/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.instances = data.Data || [];
      })
      .catch((err) => {
        throw err;
      });
  },
};
</script>

<template>
  <main class="">
    <section class="mt-5">
      <div class="">
        <section>
          <div class="grid grid-cols-2 items-center">
            <h2 class="text-xl font-semibold">Instances</h2>
            <div>
              <button
                v-on:click="
                  () => {
                    VisibleDisplay = true;
                  }
                "
                :class="`text-white rounded-lg float-right w-full lg:w-auto lg:px-12 py-3 bg-gradient-to-r from-${localStorage.theme}-300 to-${localStorage.theme}-500`"
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
          <section class="mt-3 grid xl:grid-cols-1 grid-cols-1 gap-3 w-full">
            <Target
              v-for="instance in (instances as any)"
              :key="instance"
              :Name="instance.name"
              :Type="instance.app_type"
              :Active="instance.active"
              :Description="instance.description"
              :onClickLocation="`/instance/${instance.id}`"
            />
          </section>
        </section>
        <CreateInstance
          :Visible="VisibleDisplay"
          :onCrossed="
            () => {
              VisibleDisplay = false;
            }
          "
        />
      </div>
    </section>
    <section
      v-if="instances.length == 0"
      :class="`w-full bg-steel-400 capitalize text-center rounded-lg p-5 mt-3`"
    >
      <h1 :class="`text-base text-gray-400`">
        No Instance(s) Found, Click "Create" to begin
      </h1>
    </section>
  </main>
</template>
