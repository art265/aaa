<script>
import Target from "@/components/TargetBox.vue";
export default {
  components: { Target },
  data() {
    return {
      instances: [
        {
          Description: "A discord bot that can do many things",
          Name: "Discord Bot",
          Active: true,
          Type: "Node",
        },
        {
          Description: "AI powered discord bot",
          Name: "Py Bot",
          Active: true,
          Type: "Python",
        },
      ],
    };
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
              :Name="instance.Name"
              :Type="instance.Type"
              :Active="instance.Active"
              :Description="instance.Description"
            />
          </section>
        </section>
      </div>
    </section>
  </main>
</template>
