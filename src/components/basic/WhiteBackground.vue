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
  min-height: $white-background-min-height;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 21, 41, 0.12), 0 0 8px rgba(0, 21, 41, 0.08);
}
</style>
