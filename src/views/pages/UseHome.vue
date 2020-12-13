<template>
  <white-background>
    <h1>Home...</h1>
  </white-background>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WhiteBackground from "@/components/basic/WhiteBackground.vue";

export default defineComponent({
  components: { WhiteBackground },
  name: "UseHome",
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss"></style>
