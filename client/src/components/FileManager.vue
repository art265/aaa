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
            class="text-xs text-white uppercase border-b border-steel-400 bg-steel-300 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="py-3 px-6">Name</th>
              <th scope="col" class="py-3 px-6">Type</th>
              <th scope="col" class="py-3 px-6">Size</th>
              <th scope="col" class="py-3 px-6">Price</th>
              <th scope="col" class="py-3 px-6">Action</th>
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
              <td class="py-4 px-6">Laptop</td>
              <td class="py-4 px-6">$2999</td>
              <td class="py-4 px-6">
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >Edit</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </table>
  </main>
</template>
