<template>
  <white-background :loading="loading">
    <div v-if="!loading"></div>
  </white-background>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "MovieHall",
  setup() {
    const data = reactive({
      loading: false
    });
    return { ...toRefs(data) };
  }
});
</script>

<style scoped lang="scss"></style>
