<template>
  <a-menu-item :key="route.path">
    <span class="icon" v-if="route.meta && route.meta.icon">
      <use-icon :icon="route.meta.icon" />
    </span>
    <span v-if="route.meta && route.meta.title">{{ route.meta.title }}</span>
    <span v-else>链接{{ route.path }}的title不存在</span>
  </a-menu-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteRecordRaw } from "vue-router";
import UseIcon from "@/components/UseIcon.vue";

export default defineComponent({
  name: "SideBarSubItem",
  props: {
    route: null as PropType<RouteRecordRaw> | null
  },
  components: { UseIcon },

  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss"></style>
