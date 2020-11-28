<template>
  <div class="tab-bar">
    <a-row>
      <a-col :span="22">
        <div class="tab-bar-left-panel">
          <a-tabs
            @tab-click="handleTabClick"
            @edit="handleTabClose"
            v-model:activeKey="activeTabKey"
            hide-add
            type="editable-card"
            tab-position="left"
          >
            <a-tab-pane :key="3333" :closable="true" tab="hahahah"></a-tab-pane>
            <a-tab-pane :key="3332" :closable="true" tab="abc"></a-tab-pane>
            <a-tab-pane :key="3331" :closable="true" tab="ddd"></a-tab-pane>
            <a-tab-pane :key="3335" :closable="true" tab="rrrrr"></a-tab-pane>

            <a-tab-pane
              class="tab-pane"
              size="small"
              v-for="tab in openTabs"
              :key="tab.fullPath"
              :closable="!isAffix(tab)"
              :tab="tab.meta.title"
            ></a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
      <a-col :span="2">
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
              关闭标签
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
import { DownOutlined } from "@ant-design/icons-vue";
import { mapMutations, mapState } from "vuex";
import {
  useRoute,
  RouteLocation,
  RouteRecord,
  RouteLocationNormalized,
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
    // store.addTab;
    const openTabs = computed(() => store.state.tabBar.openTabs);
    const accessibleRoutes = computed(() => store.state.route.accessibleArray);

    // 导出mutations为本组件的方法
    const {
      addTab,
      deleteTab,
      deleteOtherTabs,
      deleteLeftTabs,
      deleteRightTabs,
      deleteAllTabs
    } = mapMutations({
      addTab: "addTab",
      deleteTab: "deleteTab",
      deleteOtherTabs: "deleteOtherTabs",
      deleteLeftTabs: "deleteLeftTabs",
      deleteRightTabs: "deleteRightTabs",
      deleteAllTabs: "deleteAllTabs"
    });

    const data = reactive({
      affixTabs: [] as Array<RouteLocation>,
      // 当前激活的tab的key(fullPath)
      activeTabKey: "",

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
        deleteTab(targetTab);
      },
      handleTabOperation: (operation: TabOperation) => {
        const currentTab = getTabByFullPath(data.activeTabKey);
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
          addTab(route);
          data.activeTabKey = route.path;
        }
      });
    }

    // 初始化固定标签页
    initAffixTabs(accessibleRoutes.value);

    // route更新的时候添加tab
    watch(currentRoute, (newRoute: RouteLocationNormalizedLoaded) => {
      addTab(newRoute);
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
    position: absolute;
    left: 20px;
    width: 52px;
  }

  // ::v-deep 样式穿透并且写上!important 就可以覆盖用了scoped的组件
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
