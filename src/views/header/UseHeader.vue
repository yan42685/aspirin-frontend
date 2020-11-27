<template>
  <a-layout-header class="header">
    <a-row>
      <a-col :span="10"><use-bread-crumb /> </a-col>
      <a-col :span="10"><use-icons /></a-col>
      <a-col :span="4"><use-avatar /></a-col>
    </a-row>
    <a-row>
      <!-- 一共24列 -->
      <a-col :span="18">
        <use-tabs />
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UseIcons from "./component/UseIcons.vue";
import UseAvatar from "./component/UseAvatar.vue";
import UseTabs from "./component/UseTabs.vue";
import UseBreadCrumb from "./component/UseBreadCrumb.vue";

export default defineComponent({
  components: { UseTabs, UseIcons, UseAvatar, UseBreadCrumb },
  name: "UseHeader",
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss">
.header {
  height: 64px;
  margin: 0 0 0 10px;
  /* box-shadow: 0 0 0 2px black; */
  background-color: #b5d3e8;

  .ant-col + .ant-col {
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
  }
  .trigger {
    padding: 0 20px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
}
</style>
