<!-- template内部只能有一个root标签,否则UseContent那里的transition、router-view会出bug, 所以要用div包起来 -->
<template>
  <div><h1>Test One...</h1></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  name: "TestOne",
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss"></style>
