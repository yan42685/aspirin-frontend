<template>
  <div id="login">
    <h2>This is Login</h2>
    <!-- <pre>{{ message }}</pre> -->
  </div>
</template>

<script lang="ts">
import { getMousePosition } from "../utils/mouse-position";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  setup() {
    // const { x, y } = getMousePosition();
    // const message = `x: ${x}\ny: ${y}`;
    return {
      // message
    };
  }
});
</script>

<style module lang="scss"></style>
