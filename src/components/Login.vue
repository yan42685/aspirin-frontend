<script lang="ts">
import { getMousePosition } from "../utils/mouse-position";
import { defineComponent } from "vue";

export const Login = defineComponent({
  name: "Login",
  setup() {
    const { x, y } = getMousePosition();
    console.log(`x: ${x}\ny: ${y}`);
    return {};
  }
});
</script>

<style module lang="scss"></style>
