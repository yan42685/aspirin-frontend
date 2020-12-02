<template>
  <div id="login">
    <h2>This is Login</h2>
    <p>{{ message }}</p>
    <button @click="loginRedirect">redirect</button>
    <div class="box">
      <a-form>
        <a-form-item>
          <a-input placeholder="Username"> </a-input>
        </a-form-item>
        <a-form-item>
          <a-input type="password" placeholder="Password"> </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { getMousePosition } from "../utils/mouse-position";
import { defineComponent, computed, onMounted, onUnmounted } from "vue";
import { messenger } from "../utils/my-ant-design-vue";
import { loginRedirect } from "@/utils/timeout-actions";

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
      loginRedirect
    };
  }
});
</script>

<style scoped lang="scss">
.box {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  border: 1px solid #42b983;
}
</style>
