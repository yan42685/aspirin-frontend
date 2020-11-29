<template>
  <a-menu-item :key="route.path" @click.capture="handleClick">
    <span class="anticon" v-if="route.meta.icon">
      <use-icon :icon="route.meta.icon" />
    </span>

    <span v-if="route.meta.title">{{ route.meta.title }}</span>
  </a-menu-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteRecordRaw } from "vue-router";
import { router } from "@/router";
import UseIcon from "@/components/UseIcon.vue";

export default defineComponent({
  name: "SideBarItem",
  props: {
    route: null as PropType<RouteRecordRaw> | null
  },

  components: { UseIcon },

  setup(props) {
    function handleClick() {
      if (props.route) {
        router.push(props.route.path);
      }
    }
    return { handleClick };
  }
});
</script>

<style scoped lang="scss"></style>
