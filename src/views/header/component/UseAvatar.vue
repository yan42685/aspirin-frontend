<template>
  <div class="avatar-container">
    <a-avatar :size="50" icon="user" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UseAvatar",
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss">
.avatar-container {
  height: $header-height;
  display: flex;
  align-items: center;
}
</style>
