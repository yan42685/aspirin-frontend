<template>
  <div class="avatar-container">
    <a-avatar :size="65" class="avatar">
      <template #icon><img :src="avatarUrl" alt=""/></template>
    </a-avatar>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from "vue";
import { store } from "@/store";

export default defineComponent({
  name: "UseAvatar",
  setup() {
    const data = reactive({
      avatarUrl: computed(() => store.state.student.info.avatarUrl)
    });
    return { ...toRefs(data) };
  }
});
</script>

<style scoped lang="scss">
.avatar-container {
  display: block;
}
</style>
