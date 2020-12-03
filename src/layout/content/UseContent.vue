<template>
  <!-- 不要在router-view上写css样式, 应在外层container上写 -->
  <a-layout-content v-if="showRouterView" class="content">
    <!-- :key="currentRoute.path" -->
    <!-- TODO: 加上key -->
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedTabNames" :max="keepAliveMaxNum">
        <transition mode="out-in" name="fade-transform">
          <component :is="Component" />
        </transition>
      </keep-alive>
    </router-view>
  </a-layout-content>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs, nextTick } from "vue";
import { router } from "@/router";
import { useRoute } from "vue-router";
import { internalConfig } from "@/config/app-settings";
import { store } from "@/store";
import { eventBus } from "@/utils/event-bus";

export default defineComponent({
  name: "UseContent",

  setup() {
    const data = reactive({
      // 用于content刷新
      showRouterView: true,
      keepAliveMaxNum: internalConfig.keepAliveMaxNum,
      cachedTabNames: computed(() => {
        const cachedTabNames = [] as string[];
        store.state.tabBar.openTabs.forEach(tab => {
          if (!(tab.meta && tab.meta.noKeepAlive)) {
            if (tab.name) {
              cachedTabNames.push(tab.name as string);
            } else {
              console.log("待缓存路由没有name字段");
            }
          }
        });
        return cachedTabNames;
      })
    });

    const currentRoute = useRoute();

    eventBus.on("reloadTab", () => {
      data.showRouterView = false;
      nextTick(() => {
        data.showRouterView = true;
      });
    });
    return { router, currentRoute, ...toRefs(data) };
  }
});
</script>

<style scoped lang="scss">
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.content {
  /* position: relative; */
  min-height: 90vh;
  padding: $medium-padding;
  margin: $medium-margin;
  /* top: $medium-margin !important; */
  /* background: #fff; */
  box-shadow: 0 8px 8px rgba(10, 16, 20, 0.24), 0 0 8px rgba(10, 16, 20, 0.12);
}
</style>
