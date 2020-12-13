<template>
  <white-background>
    <div>
      <h1>404: 找不到该页面</h1>
      <p>
        <br />
        <a-button type="primary" @click.stop="handleClick">回到首页</a-button>
      </p>
    </div>
  </white-background>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { router } from "@/router";
import { useRoute } from "vue-router";
import { eventBus } from "@/utils/event-bus";
import WhiteBackground from "@/components/basic/WhiteBackground.vue";

export default defineComponent({
  components: { WhiteBackground },
  name: "404",
  setup() {
    const currentRoute = useRoute();
    const path = currentRoute.path;
    const data = reactive({
      handleClick() {
        router.replace("/home");
        eventBus.emit("close-tab-by-path", { path: path });
      }
    });

    return { ...toRefs(data) };
  }
});
</script>

<style scoped lang="scss"></style>
