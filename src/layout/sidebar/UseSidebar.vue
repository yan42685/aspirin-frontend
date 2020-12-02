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
      <dynamic-menu
        v-for="route in nonHiddenRootRoutes"
        :key="route.path"
        :route="route"
        basePath=""
      />
    </a-menu>
  </div>
</template>

<script lang="ts">
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { defineComponent, reactive, computed, toRefs } from "vue";
import DynamicMenu from "./components/DynamicMenu.vue";
import { hasPermission } from "@/utils/route";
import { staticRootRoutes, dynamicRootRoutes } from "@/router";
import UseAvatar from "./components/UseAvatar.vue";

export default defineComponent({
  name: "Sidebar",
  components: {
    UseAvatar,
    DynamicMenu
  },

  setup() {
    const data = reactive({
      selectedKeys: [] as Array<string>,
      openKeys: [] as Array<string>,
      handleClick: (e: MouseEvent) => console.log("click", e),
      titleClick: (e: MouseEvent) => console.log("titleClick", e)
    });

    const currentRoute = useRoute();

    const nonHiddenRootRoutes = computed(() =>
      [...staticRootRoutes, ...dynamicRootRoutes]
        .filter(route => hasPermission(route))
        .filter(route => route.path !== "/")
        .filter(route => !route.meta || (route.meta && !route.meta.hidden))
    );

    onBeforeRouteUpdate(() => {
      const { path, matched } = currentRoute;
      // matched[0]表示第一个匹配的路由，即当前路由的第一个父路由
      console.log("matched[0].path = ", matched[0].path);
      matched[0].children.length > 1
        ? (data.selectedKeys = [path])
        : (data.selectedKeys = [matched[0].path]);
      data.openKeys = [matched[0].path];
    });

    return {
      ...toRefs(data),
      nonHiddenRootRoutes
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
