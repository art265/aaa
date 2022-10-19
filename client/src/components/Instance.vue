<script>
import ToggleButton from "../components/ToggleButton.vue";
import FileManager from "../components/FileManager.vue";

export default {
  components: { ToggleButton, FileManager },
  data() {
    return {
      AutoRestart: false,
      directories: [
        { name: "src", isDir: true },
        { name: "index.js", isDir: false },
      ],
      localStorage: localStorage,
    };
  },
};
</script>

<template>
  <main class="p-5 mt-5 rounded-lg bg-steel-400 grid grid-cols-2 gap-5">
    <section :class="`grid-cols-5 grid`">
      <label for="" :class="`col-span-5`">Target script</label>
      <div :class="`col-span-4`">
        <input
          type="text"
          placeholder="index.js"
          class="p-3 bg-steel-300 rounded-lg w-full"
        />
      </div>
      <div :class="`ml-3`">
        <ToggleButton
          :class="`h-10`"
          :On="AutoRestart"
          :onClicked="
            () => {
              AutoRestart = !AutoRestart;
            }
          "
        />
      </div>
    </section>

    <section :class="`grid-cols-5 grid`">
      <label for="" :class="`col-span-5`">Target script</label>
      <div :class="`col-span-4`">
        <input
          type="text"
          placeholder="index.js"
          class="p-3 bg-steel-300 rounded-lg w-full"
        />
      </div>
      <div :class="`ml-3 flex`">
        <select class="px-3 bg-steel-300 rounded-lg w-full">
          <option value="">Node.js</option>
          <option value="">Python</option>
        </select>
      </div>
    </section>

    <FileManager class="col-span-2" :directories="directories" />
  </main>
</template>
