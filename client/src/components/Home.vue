<script>
import Target from "@/components/TargetBox.vue";
import Config from "../config";

export default {
  components: { Target },

  data() {
    return {
      instances: [],
    };
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
        console.log(this.instances);
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
          <h2>Instances</h2>
          <section class="mt-1 grid xl:grid-cols-2 grid-cols-1 gap-3 w-full">
            <Target
              v-for="instance in instances"
              :key="instance"
              :Name="instance.name"
              :Type="instance.app_type"
              :Active="instance.active"
              :Description="instance.description"
              :onClickLocation="`/instance/${instance.id}`"
            />
          </section>
        </section>
      </div>
    </section>
  </main>
</template>
