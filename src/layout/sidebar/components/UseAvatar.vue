<template>
  <div class="avatar-container">
    <a-popover placement="rightTop">
      <template #content>
        <div>
          <router-link to="/student/personal-center">个人中心</router-link>
        </div>
        <!-- TODO: 登出 -->
        <div class="logout-container"><a>登出</a></div>
      </template>
      <a-avatar :size="65" class="avatar">
        <template #icon><img :src="avatarUrl" alt=""/></template>
      </a-avatar>
    </a-popover>
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
.logout-container {
  margin-top: 8px;
}
.avatar-container {
  display: block;
}
</style>
