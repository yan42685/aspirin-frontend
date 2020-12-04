<template>
  <div>
    <a-spin :spinning="loading" :delay="delayTime">
      <slot></slot>
    </a-spin>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "DelayedSpin",
  props: {
    // 正在加载中
    loading: {
      type: Boolean,
      default: true
    },
    // 延迟显示
    delayTime: {
      type: Number,
      default: 500
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped>
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
</style>
