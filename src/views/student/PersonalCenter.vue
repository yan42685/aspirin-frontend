<template>
  <div>
    <a-card :loading="loading" title="Card title">
      whatever content
    </a-card>
    <a-button style="marginTop: 16px" @click="handleClick">
      Toggle loading
    </a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "PersonalCenter",
  setup() {
    const data = reactive({
      loading: true,
      handleClick: () => {
        data.loading = !data.loading;
      }
    });
    return { ...toRefs(data) };
  }
});
</script>

<style scoped lang="scss"></style>
