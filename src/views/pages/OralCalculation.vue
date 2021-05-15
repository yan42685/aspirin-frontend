<template>
  <white-background>
    <div>
      <ul>
        <li v-for="n in 10" :key="n">{{ n }}</li>
      </ul>
    </div>
  </white-background>
</template>

<script lang="ts">
import WhiteBackground from "@/components/basic/WhiteBackground.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { WhiteBackground },
  name: "OralCalculation",
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss"></style>