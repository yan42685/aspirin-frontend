<template>
  <a-sub-menu :key="route.path">
    <template v-slot:title>
      <span class="anticon" v-if="route.meta.icon">
        <use-icon :icon="route.meta.icon" />
      </span>
      <span>{{ route.meta.title }}</span>
    </template>
    <slot></slot>
  </a-sub-menu>
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
