<template>
  <a-layout-content class="content">
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade-transform">
        <component :is="Component" />
      </transition>
    </router-view>
  </a-layout-content>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { router } from "@/router";

export default defineComponent({
  name: "UseContent",

  setup() {
    return { router };
  }
});
</script>

<style scoped lang="scss">
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.content {
  /* position: relative; */
  min-height: 90vh;
  padding: $medium-padding;
  margin: $medium-margin;
  /* top: $medium-margin !important; */
  background: #fff;
  box-shadow: 0 8px 8px rgba(10, 16, 20, 0.24), 0 0 8px rgba(10, 16, 20, 0.12);
}
</style>
