<template>
  <component
    :is="itemType"
    v-if="!route.meta || (route.meta && !route.meta.hidden)"
    :route="route"
  >
    <template v-if="nonHiddenChildren.length">
      <!-- 递归动态生成item -->
      <dynamic-items
        v-for="child in nonHiddenChildren"
        :key="child.path"
        :route="child"
      >
        ></dynamic-items
      >
    </template>
  </component>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs, computed } from "vue";
import UseIcon from "@/components/UseIcon.vue";
import { RouteRecordRaw } from "vue-router";
import SideBarItem from "./SideBarItem.vue";
import SideBarSubItem from "./SideBarSubItem.vue";

type ItemType = "SideBarItem" | "SideBarSubItem";

export default defineComponent({
  name: "DynamicItems",
  components: { SideBarItem, SideBarSubItem },
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
        nonHiddenChildren.value.length === 0 ? "SideBarItem" : "SideBarSubItem"
    );

    return { nonHiddenChildren, itemType };
  }
});
</script>

<style scoped lang="scss"></style>
