<script>
import ToggleButton from "../components/ToggleButton.vue";
import FileManager from "../components/FileManager.vue";
import config from "../config";

export default {
  components: { ToggleButton, FileManager },
  data() {
    return {
      Instance: {},
      localStorage: localStorage,
    };
  },

  mounted() {
    // Fetch instance\
    fetch(`${config.server}/instances/by/me/${this.$route.params.id}`, {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.Success) {
          this.Instance = data.Data || {};
        }
      });
  },
};
</script>

<template>
  <main class="p-5 mt-5 rounded-lg bg-steel-400 grid grid-cols-2 gap-5">
    <section :class="`grid-cols-5 grid gap-3`">
      <div :class="`col-span-4`">
        <label for="" :class="`col-span-5`">Target script</label>
        <input
          type="text"
          :value="Instance.target_file"
          placeholder="index.js"
          class="p-3 bg-steel-300 rounded-lg w-full"
        />
      </div>
      <div :class="``">
        <label for="" :class="`col-span-5`">Auto restart</label>
        <ToggleButton
          :class="`h-10`"
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
          class="p-3 bg-steel-300 rounded-lg w-full"
        />
      </div>

      <div :class="`ml-3 flex`">
        <select class="px-3 bg-steel-300 rounded-lg w-full">
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

    <section :class="`space-x-3`">
      <button
        v-on:click="() => {}"
        :class="`shadow rounded-lg w-full lg:w-auto lg:px-12 py-3 bg-gradient-to-r from-${localStorage.theme}-300 to-${localStorage.theme}-500`"
      >
        Create
      </button>
      <button
        v-on:click="() => {}"
        :class="`rounded-lg w-full lg:w-auto lg:px-12 py-3 bg-steel-300 shadow`"
      >
        Go Back
      </button>
    </section>
  </main>
</template>
