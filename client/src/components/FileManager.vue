<script>
export default {
  props: {
    directories: {
      type: Array,
      required: true,
    },
  },

  methods: {
    ColorToClass() {
      this.DarkColor = !this.DarkColor;
      return this.DarkColor == true ? "bg-steel-300" : "bg-steel-200";
    },

    ByteSizeFormatter(bytes) {
      if (bytes == 0) return "0 Bytes";
      var k = 1024,
        dm = 2,
        sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    },
  },

  data() {
    return {
      DarkColor: true,
    };
  },
};
</script>

<template>
  <main>
    <h3>File Manager</h3>
    <table class="table-auto text-start w-full bg-steel-300 rounded-lg p-3">
      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-300">
          <thead
            :class="`text-xs text-white uppercase border-b border-steel-400 ${ColorToClass()} dark:bg-gray-700 dark:text-gray-400`"
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
              v-for="dir in directories"
              :key="dir"
            >
              <th
                scope="row"
                class="py-4 px-6 font-medium whitespace-nowrap dark:text-white"
              >
                {{ dir.name }}
              </th>
              <td class="py-4 px-6">{{ dir.isDir ? "Folder" : "File" }}</td>
              <td class="py-4 px-6">
                {{ ByteSizeFormatter(parseFloat(dir.size)) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </table>
  </main>
</template>
