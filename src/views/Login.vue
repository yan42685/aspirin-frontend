<template>
  <div id="login">
    <h2>This is Login</h2>
    <p>{{ message }}</p>
    <button @click="loginRedirectMessage">redirect</button>
  </div>
</template>

<script lang="ts">
import { getMousePosition } from "../utils/mouse-position";
import { defineComponent, computed, onMounted, onUnmounted } from "vue";
import { messenger } from "../utils/my-ant-design-vue";
import { loginRedirectMessage } from "@/utils/timeout-actions";

export default defineComponent({
  name: "Login",
  setup() {
    const { x, y } = getMousePosition();
    const message = computed(() => `(${x.value}, ${y.value})`);

    const showClickPosition = () => {
      messenger.info(message.value);
    };

    onMounted(() => {
      document.addEventListener("click", showClickPosition);
    });
    onUnmounted(() => {
      document.removeEventListener("click", showClickPosition);
    });
    return {
      message,
      loginRedirectMessage
    };
  }
});
</script>

<style module lang="scss"></style>
