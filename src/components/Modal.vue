<template>
  <teleport to="#dialog">
    <div id="center" v-if="isOpen">
      <h2><slot>This is a dialog</slot></h2>
      <button @click="onButtonClick">Close</button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    isOpen: Boolean
  },

  emits: {
    "close-dialog": null
  },
  setup(props, context) {
    const onButtonClick = () => {
      context.emit("close-dialog");
    };

    return { onButtonClick };
  }
});
</script>

<style scoped lang="scss"></style>
