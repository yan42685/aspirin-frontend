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
import { defineComponent, PropType, computed } from "vue";
import { RouteRecordRaw, useRoute, RouteRecord } from "vue-router";
import UseIcon from "@/components/UseIcon.vue";
import { router } from "@/router";
import { store } from "@/store";
import { getTabByPath } from "@/service/tab";
import { concatPath } from "@/utils/basic-lib";

export default defineComponent({
  name: "MenuItem",
  props: {
    route: null as PropType<RouteRecordRaw> | null,
    basePath: {
      type: String,
      default: ""
    }
  },
  components: { UseIcon },

  setup(props) {
    const currentRoute = useRoute();

    const targetPath = computed(() =>
      concatPath(props.basePath, props.route.path)
    );
    function handleClick() {
      console.log("targetpath:", targetPath.value);
      console.log("currentRoutePath:", currentRoute.path);
      router.push(targetPath.value);
    }

    return { handleClick };
  }
});
</script>

<style scoped lang="scss"></style>
