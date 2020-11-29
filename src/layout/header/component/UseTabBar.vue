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
              :key="tab.fullPath"
              :closable="!isAffix(tab)"
              :tab="tab.meta.title"
            ></a-tab-pane>

            <a-tab-pane key="3333" :closable="true" tab="hahahah"></a-tab-pane>
            <a-tab-pane key="3332" :closable="true" tab="abc"></a-tab-pane>
            <a-tab-pane key="3331" :closable="true" tab="ddd"></a-tab-pane>
            <a-tab-pane key="3335" :closable="true" tab="rrrrr"></a-tab-pane>
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
import { defineComponent, reactive, toRefs, computed, Ref, watch } from "vue";
import {
  useRoute,
  RouteLocation,
  RouteRecordRaw,
  RouteLocationNormalizedLoaded
} from "vue-router";
import { store } from "@/store";
import { router } from "@/router";
import { activateLastTab, getTabByFullPath } from "@/service/tab";

type TabOperation = "CLOSE_LEFT" | "CLOSE_RIGHT" | "CLOSE_OTHER" | "CLOSE_ALL";

export default defineComponent({
  name: "UseTabBar",
  components: {
    DownOutlined
  },

  setup() {
    // 当前路由信息
    const currentRoute = useRoute();
    const openTabs = computed(() => store.state.tabBar.openTabs);
    const accessibleRoutes = computed(() => store.state.route.accessibleArray);

    const addTab = (newTab: RouteLocation) => store.commit("addTab", newTab);
    const deleteTab = (targetTab: RouteLocation) =>
      store.commit("deleteTab", targetTab);
    const deleteOtherTabs = (currentTab: RouteLocation) =>
      store.commit("deleteOtherTabs", currentTab);
    const deleteLeftTabs = (currentTab: RouteLocation) =>
      store.commit("deleteLeftTabs", currentTab);
    const deleteRightTabs = (currentTab: RouteLocation) =>
      store.commit("deleteRightTabs", currentTab);
    const deleteAllTabs = () => store.commit("deleteAllTabs");

    const data = reactive({
      affixTabs: [] as Array<RouteLocation>,
      // 当前激活的tab的key(fullPath)
      activeTabKey: "3333",

      isAffix: (tab: RouteLocation): boolean => tab.meta.affix,
      handleTabClick: (fullPath: string) => {
        // fullPath不一样才更新视图
        if (currentRoute.fullPath !== fullPath) {
          router.push(fullPath);
        }
      },
      handleTabClose: (fullPath: string) => {
        if (currentRoute.path === fullPath) {
          activateLastTab();
        }
        const targetTab = getTabByFullPath(fullPath);
        if (targetTab) {
          deleteTab(targetTab);
        }
      },
      handleTabOperation: (operation: TabOperation) => {
        const currentTab = getTabByFullPath(data.activeTabKey);
        if (!currentTab) {
          console.log("找不到当前tab");
          return;
        }

        switch (operation) {
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
            break;
          default:
            break;
        }
      }
    });

    function initAffixTabs(routeRecords: Array<RouteRecordRaw>) {
      routeRecords.forEach(route => {
        if (route.meta && route.meta.affix) {
          addTab(Object.assign({} as RouteLocation, route));
          data.activeTabKey = route.path;
          console.log(data.activeTabKey);
        }
      });
    }

    // 初始化固定标签页
    initAffixTabs(accessibleRoutes.value);

    // route更新的时候添加tab;
    watch(currentRoute, (newRoute: RouteLocationNormalizedLoaded) => {
      // addTab(newRoute);
      data.activeTabKey = newRoute.fullPath;
    });

    return {
      ...toRefs(data),
      openTabs
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
