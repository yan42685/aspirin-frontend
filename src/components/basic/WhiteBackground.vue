<template>
  <delayed-spin :loading="loading" :loadingDelay="loadingDelay" class="spin">
    <div class="background">
      <slot></slot>
    </div>
  </delayed-spin>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DelayedSpin from "./DelayedSpin.vue";

export default defineComponent({
  name: "WhiteBackground",

  props: {
    // 正在加载中
    loading: {
      type: Boolean,
      default: false
    },
    // 延迟显示
    loadingDelay: {
      type: Number,
      default: 500
    }
  },

  components: { DelayedSpin },

  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss">
.background {
  min-height: 81vh;
  background: #fff;
  box-shadow: 0 8px 8px rgba(10, 16, 20, 0.24), 0 0 8px rgba(10, 16, 20, 0.12);
}
</style>
