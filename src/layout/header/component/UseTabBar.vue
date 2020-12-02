<template>
  <div class="tab-bar">
    <a-row>
      <a-col :span="20">
        <div class="tab-bar-left-panel">
          <a-tabs
            @tab-click="handleTabClick"
            @edit="handleTabClose"
            hide-add
            v-model:activeKey="activeTabKey"
            type="editable-card"
            tab-position="left"
          >
            <a-tab-pane
              class="tab-pane"
              size="small"
              v-for="tab in openTabs"
              :key="tab.path"
              :closable="!(tab.meta && tab.meta.affix)"
              :tab="tab.meta.title"
            ></a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
      <a-col :span="4">
        <div class="tab-bar-right-panel">
          <a-dropdown>
            <template v-slot:overlay>
              <a-menu @click="handleTabOperation">
                <a-menu-item key="CLOSE_OTHER">
                  <a>关闭其他</a>
                </a-menu-item>
                <a-menu-item key="CLOSE_LEFT">
                  <a>关闭左侧</a>
                </a-menu-item>
                <a-menu-item key="CLOSE_RIGHT">
                  <a>关闭右侧</a>
                </a-menu-item>
                <a-menu-item key="CLOSE_ALL">
                  <a>关闭全部</a>
                </a-menu-item>
              </a-menu>
            </template>
            <a-button>
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, Ref } from "vue";
import {
  useRoute,
  RouteLocation,
  RouteRecord,
  onBeforeRouteUpdate
} from "vue-router";
import { store } from "@/store";
import { router } from "@/router";
import { getTabByPath } from "@/service/tab";
import { DownOutlined } from "@ant-design/icons-vue";
import { routeMetaContains } from "@/utils/route";

type TabOperation = "CLOSE_LEFT" | "CLOSE_RIGHT" | "CLOSE_OTHER" | "CLOSE_ALL";

export default defineComponent({
  name: "UseTabBar",
  components: { DownOutlined },

  setup() {
    // 当前路由信息
    const currentRoute = useRoute();
    const openTabs: Ref<RouteLocation[]> = computed(
      () => store.state.tabBar.openTabs
    );

    const addTab = (newTab: RouteLocation | RouteRecord) =>
      store.commit("addTab", newTab);
    const deleteTab = (targetTab: RouteLocation) =>
      store.commit("deleteTab", targetTab);
    const deleteOtherTabs = (currentTab: RouteLocation) =>
      store.commit("deleteOtherTabs", currentTab);
    const deleteLeftTabs = (currentTab: RouteLocation) =>
      store.commit("deleteLeftTabs", currentTab);
    const deleteRightTabs = (currentTab: RouteLocation) =>
      store.commit("deleteRightTabs", currentTab);
    const deleteAllTabs = () => store.commit("deleteAllTabs");

    function goToLastTab() {
      const tabPath = openTabs.value[openTabs.value.length - 1].path;
      if (tabPath) {
        router.push(tabPath);
      }
    }

    function goToNextTab(currentTabIndex: number) {
      console.log("currentTabIndex", currentTabIndex);
      if (currentTabIndex >= 0) {
        const nextTabIndex =
          // 如果现在是最后一个tab
          currentTabIndex === openTabs.value.length
            ? currentTabIndex - 1
            : currentTabIndex;
        console.log("nextTabIndex", nextTabIndex);
        const path = openTabs.value[nextTabIndex].path;
        router.push(path);

        // TODO: 关闭最后一个tab
        // goToLastTab();
        // data.activeTabKey = openTabs.value[openTabs.value.length - 1].path;
      }
    }

    const data = reactive({
      // 当前激活的tab的key(path)
      activeTabKey: "",

      handleTabClick: (path: string) => {
        router.push(path);
      },
      handleTabClose: (path: string) => {
        const currentPath = currentRoute.path;
        const currentTabIndex = openTabs.value.findIndex(
          tab => tab.path === currentPath
        );

        const targetTab = getTabByPath(path);
        if (targetTab) {
          deleteTab(targetTab);
        }
        // 如果关闭的是当前页面
        if (path === currentPath) {
          goToNextTab(currentTabIndex);
        }
      },

      // 注意这里是解构运算符
      handleTabOperation: (operation: any) => {
        const currentTab = getTabByPath(data.activeTabKey);
        if (!currentTab) {
          console.log("找不到当前tab");
          return;
        }

        switch (operation.key as TabOperation) {
          case "CLOSE_LEFT":
            deleteLeftTabs(currentTab);
            break;
          case "CLOSE_RIGHT":
            deleteRightTabs(currentTab);
            break;
          case "CLOSE_OTHER":
            deleteOtherTabs(currentTab);
            break;
          case "CLOSE_ALL":
            deleteAllTabs();
            goToLastTab();
            data.activeTabKey = openTabs.value[openTabs.value.length - 1].path;
            break;
          default:
            break;
        }
      }
    });

    function initAffixTabs(routes: RouteRecord[]) {
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          addTab(route);
          data.activeTabKey = route.path;
        }
      });
    }

    // 初始化固定标签页
    initAffixTabs(router.getRoutes());

    onBeforeRouteUpdate((to, from, next) => {
      addTab(to);
      data.activeTabKey = to.path;
      next();
    });
    //
    return {
      ...toRefs(data),
      openTabs,
      routeMetaContains
    };
  }
});
</script>
<style scoped lang="scss">
.tab-bar {
  position: relative;
  &-left-panel {
    width: calc(100% - 52px - 30px);
  }
  &-right-panel {
    position: relative;
    width: 100%;
    text-align: left;
    top: 5px;
    right: -23px;
    ::v-deep .ant-btn {
      right: -9px !important;
      top: 5px !important;

      padding: 0 10px !important;
      height: 22px !important;
    }
  }

  // ::v-deep 样式穿透并且写上!important 就可以覆盖用了scoped的组件的样式
  ::v-deep .ant-tabs {
    margin-bottom: 5px !important;
    &-bar {
      margin: 5px !important;
    }
    &-vertical {
      height: $subheader2-height !important;
    }
    &-tab {
      display: inline-block !important;
      height: 32px !important;
      margin-right: 5px !important;
      padding-bottom: 5px !important;
      line-height: 32px !important;
      background: #ffffff !important;
      border: 1px solid #dedede !important;
    }
    &-tab-prev,
    &-tab-next {
      height: 32px !important;
      line-height: 32px !important;
    }

    &-tab-active {
      border: 1px solid #1890ff !important;
      .ant-tabs-close-x {
        color: #1890ff !important;
      }
    }
  }
}
</style>
