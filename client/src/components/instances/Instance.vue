<script>
import ToggleButton from "../ToggleButton.vue";
import FileManager from "../FileManager.vue";
import config from "../../config";

export default {
  components: { ToggleButton, FileManager },

  data() {
    return {
      Instance: {
        name: "",
        app_type: "",
        target_file: "",
        AutoRestart: false,
        InstanceRunning: true,
        full_path: "",
        id: "",
        files: [],
      },
      localStorage: localStorage,
    };
  },

  mounted() {
    fetch(`${config.server}/instances/by/me/${this.$route.params.id}`, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Success) {
          this.Instance = data.Data || {};
        }
      });
  },
};
</script>

<template>
  <section class="p-5 mt-5 rounded-lg bg-steel-400 grid grid-cols-2 gap-5">
    <section :class="`grid-cols-5 grid gap-3`">
      <div :class="`col-span-4`">
        <label for="" :class="`col-span-5`">Target script</label>
        <input
          type="text"
          :value="Instance.target_file"
          placeholder="index.js"
          class="shadow p-3 bg-steel-300 rounded-lg w-full"
        />
      </div>
      <div :class="``">
        <label for="" :class="`col-span-5`">Auto restart</label>
        <ToggleButton
          :class="`h-10 shadow`"
          :On="Instance.AutoRestart"
          :onClicked="
            () => {
              Instance.AutoRestart = !Instance.AutoRestart;
            }
          "
        />
      </div>
    </section>

    <section :class="`grid-cols-5 grid`">
      <label for="" :class="`col-span-5`">Directory Destination</label>
      <div :class="`col-span-4`">
        <input
          disabled="true"
          type="text"
          placeholder="index.js"
          :value="Instance.full_path"
          class="shadow p-3 bg-steel-300 rounded-lg w-full"
        />
      </div>

      <div :class="`ml-3 flex`">
        <select class="shadow px-3 bg-steel-300 rounded-lg w-full">
          <option
            :selected="Instance.app_type?.toLowerCase() == 'node'"
            value="Node"
          >
            Node.js
          </option>
          <option
            :selected="Instance.app_type?.toLowerCase() == 'python'"
            value="Python"
          >
            Python
          </option>
        </select>
      </div>
    </section>

    <FileManager class="col-span-2" :directories="Instance.files" />

    <section :class="`space-x-3 grid grid-cols-2 col-span-2`">
      <div class="space-x-3">
        <button
          v-on:click="() => {}"
          :class="`text-white shadow rounded-lg w-full lg:w-auto lg:px-12 py-3 bg-gradient-to-r from-${localStorage.theme}-300 to-${localStorage.theme}-500`"
        >
          Save
        </button>
        <router-link :to="`/instances`">
          <button
            v-on:click="() => {}"
            :class="`rounded-lg w-full lg:w-auto lg:px-12 py-3 bg-steel-300 shadow`"
          >
            Go Back
          </button>
        </router-link>
      </div>
      <div class="">
        <div class="w-56 float-right">
          <ToggleButton
            :class="`h-10 shadow`"
            :OnText="`Running`"
            :OffText="`Stopped`"
            :On="Instance.InstanceRunning"
            :onClicked="
              () => {
                Instance.InstanceRunning = !Instance.InstanceRunning;
              }
            "
          />
        </div>
      </div>
    </section>
  </section>

  <section :class="`w-full mt-3`">
    <section :class="`bg-steel-400 rounded-lg p-3`">
      <div class="grid grid-cols-2">
        <div>
          <button
            v-on:click="() => {}"
            :class="`text-white shadow rounded-lg w-full lg:w-auto lg:px-12 py-3 bg-gradient-to-r from-${localStorage.theme}-300 to-${localStorage.theme}-500`"
          >
            Upload
          </button>
        </div>
        <div class="flex flex-wrap space-x-3 float-right">
          <select
            class="shadow float-right px-5 appearance-none cursor-pointer bg-steel-300 rounded-lg"
            :style="`width: 75%;`"
          >
            <option
              :selected="Instance.app_type?.toLowerCase() == 'node'"
              value="Node"
            >
              Node.js
            </option>
            <option
              :selected="Instance.app_type?.toLowerCase() == 'python'"
              value="Python"
            >
              Python
            </option>
          </select>
          <button
            v-on:click="() => {}"
            :style="`width: 22%;`"
            :class="`text-white float-right shadow rounded-lg py-3 bg-gradient-to-r from-${localStorage.theme}-300 to-${localStorage.theme}-500`"
          >
            Unzip
          </button>
        </div>
      </div>
    </section>
  </section>
</template>
