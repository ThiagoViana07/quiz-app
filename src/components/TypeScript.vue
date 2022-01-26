<template>
  <div>
    <p>{{ count }}</p>
    <p>{{ user.age }}</p>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue";

export default defineComponent({
  setup() {
    const count = ref(0);

    const user = reactive({
      name: "Thiago",
      age: "22",
    });

    return {
      count,
      user,
    };
  },
});
</script>

<style></style>
