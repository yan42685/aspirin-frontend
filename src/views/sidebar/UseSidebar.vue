<template>
  <div class="sidebar-containter">
    <div class="top-title">
      <h1>Aspirin</h1>
      <!-- TODO: hover隐藏的toggle开关 -->
      <!-- <menu-unfold-outlined                                                 -->
      <!--   v-if="sidebarCollapsed"                                             -->
      <!--   class="trigger"                                                     -->
      <!--   @click="toggleCollapse"                                             -->
      <!-- />                                                                    -->
      <!-- <menu-fold-outlined v-else class="trigger" @click="toggleCollapse" /> -->
    </div>
    <a-menu
      class="sidebar"
      id="sidebar"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      @click="handleClick"
    >
      <a-sub-menu key="sub1" @titleClick="titleClick">
        <template #title>
          <span><MailOutlined /><span>Navigation One</span></span>
        </template>
        <a-menu-item key="1">Option 1</a-menu-item>
        <a-menu-item key="2">Option 2</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2" @titleClick="titleClick">
        <template #title>
          <span><AppstoreOutlined /><span>Navigation Two</span></span>
        </template>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="7"> Option 7 </a-menu-item>
          <a-menu-item key="8"> Option 8 </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <template #title>
          <span><SettingOutlined /><span>Navigation Three333333</span></span>
        </template>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-menu-item key="11">Option 11</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script lang="ts">
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined
} from "@ant-design/icons-vue";
import { defineComponent, reactive, toRefs, watch } from "vue";
export default defineComponent({
  name: "Sidebar",
  components: {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined
  },

  setup() {
    const data = reactive({
      selectedKeys: [] as Array<string>,
      openKeys: [] as Array<string>,
      handleClick: (e: MouseEvent) => console.log("click", e),
      titleClick: (e: MouseEvent) => console.log("titleClick", e)
    });

    watch(data.openKeys, newValue => console.log("openKeys: ", newValue));

    return {
      ...toRefs(data)
    };
  }
});
</script>

<style scoped lang="scss">
.sidebar-containter {
  border: {
    right: $common-border;
  }
}

.sidebar {
  height: 100vh;
  text-align: left;
}

.top-title {
  background-color: $sidebar-top-title-color;
  h1 {
    margin-bottom: 0;
    height: $header-height;
    line-height: $header-height;
  }
}
</style>
