<template>
  <div class="avatar-container">
    <a-avatar class="avatar" :size="60" icon="user" />
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
  display: block;
}
</style>
