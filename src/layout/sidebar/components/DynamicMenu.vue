<template>
  <!-- 递归动态生成item -->
  <component
    :is="itemType"
    v-if="!route.meta || (route.meta && !route.meta.hidden)"
    :route="route"
  >
    <template v-if="nonHiddenChildren.length">
      <dynamic-menu
        v-for="child in nonHiddenChildren"
        :key="child.path"
        :route="child"
      >
        ></dynamic-menu
      >
    </template>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs, computed } from "vue";
import { RouteRecordRaw } from "vue-router";
import SubMenu from "./SubMenu.vue";
import MenuItem from "./MenuItem.vue";

type ItemType = "SubMenu" | "MenuItem";

export default defineComponent({
  name: "DynamicMenu",
  components: { SubMenu, MenuItem },
  props: {
    route: null as PropType<RouteRecordRaw> | null
  },

  setup(props) {
    function getNonHiddenChildren(route: RouteRecordRaw) {
      let children = [] as Array<RouteRecordRaw>;
      if (route.children && route.children.length !== 0) {
        children = route.children.filter(
          route => !route.meta || (route.meta && !route.meta.hidden)
        );
      }
      return children;
    }

    const nonHiddenChildren = computed(() => getNonHiddenChildren(props.route));

    const itemType = computed(
      (): ItemType =>
        nonHiddenChildren.value.length !== 0 ? "SubMenu" : "MenuItem"
    );

    return { nonHiddenChildren, itemType };
  }
});
</script>

<style scoped lang="scss"></style>
