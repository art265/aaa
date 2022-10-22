<script lang="ts">
import ToggleButton from "@/components/ToggleButton.vue";
import config from "../../config";
import toast from "../toast";

export default {
  data() {
    return {
      Name: "My App",
      MaxMemory: 256,
      AppType: "Node",
      Watch: true,
      Detached: true,
      AutoRestart: false,
      TargetFile: "index.js",
      LogsDirectory: "/logs",
      localStorage: localStorage,
    };
  },

  components: { ToggleButton },

  props: {
    onCreated: {
      type: Function,
      required: true,
    },

    Visible: {
      type: Boolean,
      required: true,
    },

    onCrossed: {
      type: Function,
      required: true,
    },
  },

  methods: {
    Create() {
      // Create new user post request using fetch with json body
      fetch(`${config.server}/instances/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify({
          name: this.Name,
          max_memory: this.MaxMemory,
          app_type: this.AppType,
          watch: this.Watch,
          target_file: this.TargetFile,
          detached: this.Detached,
          auto_restart: this.AutoRestart,
          logs_dir: this.LogsDirectory,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.Success) {
            toast.$success(data.Message);
            this.onCrossed();
          } else {
            toast.$failure(data.Message);
          }

          this.onCreated();
        })
        .catch((err) => {
          throw err;
        });
    },

    onSelectChange(e: any) {
      const type = e.target.value;

      switch (type) {
        case "Node":
          this.TargetFile = "index.js";
          break;
        case "Python":
          this.TargetFile = "main.py";
          break;
      }

      this.AppType = type;
    },
  },
};
</script>

<template>
  <div
    v-if="Visible"
    tabindex="-1"
    aria-hidden="true"
    class="overflow-y-auto flex flex-wrap justify-center mt-20 overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
  >
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <div class="relative bg-steel-400 rounded-lg shadow">
        <div
          class="flex justify-between items-start p-5 rounded-t border-b border-steel-500"
        >
          <h3 class="text-xl font-semibold text-white">Create Instance</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-steel-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            v-on:click="
              () => {
                onCrossed();
              }
            "
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <div class="px-6 mt-3 text-gray-300 grid-cols-1 grid gap-3 text-sm">
          <div class="space-y-2">
            <div>
              <label for="">Name</label>
              <input
                type="text"
                :value="Name"
                :placeholder="Name"
                :class="`w-full py-3 px-5 text-gray-300 bg-steel-300 rounded-lg`"
                @input="
                  (e) => {
                    Name = (e.target as HTMLInputElement).value;
                  }
                "
              />
            </div>
          </div>
        </div>

        <div class="grid-cols-5 grid gap-3 px-6 mt-3 items-center">
          <div :class="`col-span-2`">
            <label for="">Max Memory(MegaBytes)</label>
            <input
              type="number"
              :value="MaxMemory"
              :placeholder="(MaxMemory as any)"
              :class="`w-full py-3 px-5 text-gray-300 bg-steel-300 rounded-lg`"
              @input="
                  (e) => {
                    MaxMemory = parseInt((e.target as HTMLInputElement).value);
                  }
                "
            />
          </div>

          <div :class="`col-span-2`">
            <label for="">Type</label>
            <select
              class="bg-steel-300 py-3 px-3 rounded-lg w-full"
              @change="onSelectChange"
            >
              <option
                :selected="AppType?.toLocaleLowerCase() === 'node'"
                value="Node"
              >
                Node.js
              </option>
              <option
                :selected="AppType?.toLocaleLowerCase() === 'python'"
                value="Python"
              >
                Python
              </option>
            </select>
          </div>

          <div :class="`text-gray-300 col-span-1`">
            <label for="">Auto Restart</label>
            <ToggleButton
              :On="AutoRestart"
              ClassName="h-10"
              :onClicked="
                () => {
                  AutoRestart = !AutoRestart;
                }
              "
            />
          </div>
        </div>

        <div class="grid-cols-5 grid gap-3 px-6 mt-3 items-center">
          <div :class="`col-span-3`">
            <label for="">Logs Directory</label>
            <input
              type="text"
              :value="LogsDirectory"
              :placeholder="LogsDirectory"
              :class="`w-full py-3 px-5 text-gray-300 bg-steel-300 rounded-lg`"
              @input="
                  (e) => {
                    LogsDirectory = (e.target as HTMLInputElement).value;
                  }
                "
            />
          </div>

          <div :class="`text-gray-300 col-span-1`">
            <label for="">Watch</label>
            <ToggleButton
              :On="Watch"
              ClassName="h-10"
              :onClicked="
                () => {
                  Watch = !Watch;
                }
              "
            />
          </div>

          <div :class="`text-gray-300 col-span-1`">
            <label for="">Detached</label>
            <ToggleButton
              :On="Detached"
              ClassName="h-10"
              :onClicked="
                () => {
                  Detached = !Detached;
                }
              "
            />
          </div>
        </div>

        <div class="px-6 mt-3 text-gray-300 grid-cols-1 grid gap-3 text-sm">
          <div class="space-y-2">
            <div class="space-y-2">
              <div>
                <label for="">Target File</label>
                <input
                  type="text"
                  :value="TargetFile"
                  :placeholder="TargetFile"
                  :class="`w-full py-3 px-5 text-gray-300 bg-steel-300 rounded-lg`"
                  @input="
                  (e) => {
                    TargetFile = (e.target as HTMLInputElement).value;
                  }
                "
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center px-6 mt-4 space-x-2 rounded-b">
          <button
            :class="`rounded-lg float-right w-full lg:w-auto lg:px-12 py-3 bg-gradient-to-r from-${localStorage.theme}-300 to-${localStorage.theme}-500`"
            v-on:click="Create"
          >
            Save
          </button>
          <button
            :class="`rounded-lg float-right w-full lg:w-auto lg:px-8 py-3 bg-steel-300`"
            v-on:click="
              () => {
                onCrossed();
              }
            "
          >
            Close
          </button>
        </div>
        <div class="py-3"></div>
      </div>
    </div>
  </div>
</template>
