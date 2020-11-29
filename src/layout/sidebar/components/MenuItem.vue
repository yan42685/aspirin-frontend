<template>
  <a-menu-item :key="route.path" @click.capture="handleClick">
    <span class="icon" v-if="route.meta && route.meta.icon">
      <use-icon :icon="route.meta.icon" />
    </span>
    <span v-if="route.meta && route.meta.title">{{ route.meta.title }}</span>
    <span v-else>链接{{ route.path }}的title不存在</span>
  </a-menu-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteRecordRaw, useRoute, RouteRecord } from "vue-router";
import UseIcon from "@/components/UseIcon.vue";
import { router } from "@/router";

export default defineComponent({
  name: "MenuItem",
  props: {
    route: null as PropType<RouteRecordRaw> | null
  },
  components: { UseIcon },

  setup(props) {
    const currentRoute = useRoute();
    function handleClick() {
      console.log("currentFullPath: ", currentRoute.fullPath);
      console.log("targetRoute: ", props.route);
      if (props.route && props.route.fullPath) {
        const targetFullPath = props.route.fullPath;
        if (targetFullPath !== currentRoute.fullPath) {
          router.push(targetFullPath);
        }
      } else {
        console.log("目标route的fullpath不存在");
      }
    }

    return { handleClick };
  }
});
</script>

<style scoped lang="scss"></style>
