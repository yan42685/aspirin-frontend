<template>
  <div class="sidebar-containter">
    <div class="top-title">
      <use-avatar />
    </div>
    <dynamic-items
      v-for="route in nonHiddenRoutes"
      :key="route.path"
      :route="route"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, computed } from "vue";
import UseAvatar from "../sidebar/components/UseAvatar.vue";
import DynamicItems from "./components/DynamicItems.vue";
import { store } from "@/store";

export default defineComponent({
  name: "Sidebar",
  components: {
    UseAvatar,
    DynamicItems
  },

  setup() {
    const data = reactive({
      selectedKeys: [] as Array<string>,
      openKeys: [] as Array<string>,
      handleClick: (e: MouseEvent) => console.log("click", e),
      titleClick: (e: MouseEvent) => console.log("titleClick", e)
    });

    const nonHiddenRoutes = computed(() =>
      store.state.route.accessibleArray
        .filter(route => route.path !== "/")
        .filter(route => !route.meta || (route.meta && !route.meta.hidden))
    );

    return {
      ...toRefs(data),
      nonHiddenRoutes
    };
  }
});
</script>

<style scoped lang="scss">
.sidebar-containter {
  z-index: 100;
  position: fixed;
  border: {
    right: $common-border;
  }
  .top-title {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $sidebar-top-title-color;
    margin-bottom: 0;
    height: $sidebar-top-title-height;
    line-height: $sidebar-top-title-height;
  }

  .sidebar {
    height: 100vh;
    text-align: left;
  }
}
</style>
