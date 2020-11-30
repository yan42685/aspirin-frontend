<template>
  <a-sub-menu :key="route.path">
    <template v-slot:title>
      <span class="icon" v-if="route.meta && route.meta.icon">
        <use-icon :icon="route.meta.icon" />
      </span>
      <span v-if="route.meta && route.meta.title">{{ route.meta.title }}</span>
      <span v-else>链接{{ route.path }}的title不存在</span>
    </template>
    <slot></slot>
  </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteRecordRaw } from "vue-router";
import { router } from "@/router";
import UseIcon from "@/components/UseIcon.vue";

export default defineComponent({
  name: "SubMenu",
  props: {
    route: null as PropType<RouteRecordRaw> | null,
    basePath: {
      type: String,
      default: ""
    }
  },

  components: { UseIcon },

  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss"></style>
