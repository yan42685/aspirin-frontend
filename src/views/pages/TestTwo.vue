<template>
  <white-background :loading="true">
    <div><h1>Test Two...</h1></div>
  </white-background>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WhiteBackground from "@/components/basic/WhiteBackground.vue";

export default defineComponent({
  components: { WhiteBackground },
  name: "TestTwo",
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss"></style>
