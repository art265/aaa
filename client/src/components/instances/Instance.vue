<script lang="ts">
import ToggleButton from "../ToggleButton.vue";
import FileManager from "../FileManager.vue";
import config from "../../config";

export default {
  components: { ToggleButton, FileManager },

  data() {
    return {
      Instance: {
        id: "",
        name: "",
        app_type: "",
        target_file: "",
        AutoRestart: false,
        InstanceRunning: true,
        full_path: "",
        files: [],
      },
      DarkColor: false,
      SelectedFiles: [],
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

  methods: {
    ColorToClass() {
      this.DarkColor = !this.DarkColor;
      return this.DarkColor == true ? "bg-steel-300" : "bg-steel-200";
    },

    ByteSizeFormatter(bytes: number) {
      if (bytes == 0) return "0 Bytes";
      var k = 1024,
        dm = 2,
        sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },

    formatBytes(bytes: number) {
      if (bytes == 0) return "0 Bytes";
      var k = 1024,
        dm = 2,
        sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },

    onFilesChange(e: any) {
      const files = e.target.files;
      for (let x = 0; x < files.length; x++) {
        const file = files[x];
        console.log(file);
        this.SelectedFiles = files;
      }
    },
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
        <div class="flex flex-wrap space-x-3 float-right">
          <label
            for="dropzone-file"
            :class="`text-white  shadow rounded-lg w-full lg:w-auto lg:px-12 py-3 bg-gradient-to-r from-${localStorage.theme}-300 to-${localStorage.theme}-500`"
          >
            <span>Upload</span>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              multiple
              v-on:change="
                (e) => {
                  onFilesChange(e);
                }
              "
            />
          </label>
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

    <section
      :class="`w-full mt-3 bg-steel-400 rounded-lg p-3`"
      v-if="SelectedFiles.length > 0"
    >
      <table class="table-auto text-start w-full bg-steel-300 rounded-lg p-3">
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-300">
            <thead
              :class="`text-xs text-white uppercase border-b border-steel-400 ${ColorToClass()}`"
            >
              <tr>
                <th scope="col" class="py-3 px-6">Name</th>
                <th scope="col" class="py-3 px-6">Type</th>
                <th scope="col" class="py-3 px-6">Size</th>
              </tr>
            </thead>
            <tbody>
              <tr
                :class="`${ColorToClass()} border-b border-steel-400`"
                v-for="dir in (SelectedFiles as any)"
                :key="dir"
              >
                <th
                  scope="row"
                  class="py-4 px-6 font-medium whitespace-nowrap dark:text-white"
                >
                  {{ dir.name }}
                </th>
                <td class="py-4 px-6">{{ dir.type }}</td>
                <td class="py-4 px-6">
                  {{ ByteSizeFormatter(parseFloat(dir.size)) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </table>
    </section>
  </section>
</template>
