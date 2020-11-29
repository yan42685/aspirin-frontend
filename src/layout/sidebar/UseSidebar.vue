<template>
  <div class="sidebar-containter">
    <div class="top-title">
      <use-avatar />
    </div>
    <a-menu
      class="menu"
      mode="inline"
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
    >
      <dynamic-items
        v-for="route in nonHiddenRoutes"
        :key="route.path"
        :route="route"
      />
    </a-menu>
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
  .top-title {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $sidebar-top-title-color;
    margin-bottom: 0;
    height: $sidebar-top-title-height;
    line-height: $sidebar-top-title-height;
  }

  .menu {
    text-align: left;
    height: 100vh;
    border: {
      right: $common-border;
    }
  }
}
</style>
