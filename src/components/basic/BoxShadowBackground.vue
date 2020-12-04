<template>
  <div class="background">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BoxShadowBackground",
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss">
.background {
  background: #fff;
  box-shadow: 0 8px 8px rgba(10, 16, 20, 0.24), 0 0 8px rgba(10, 16, 20, 0.12);
}
</style>
