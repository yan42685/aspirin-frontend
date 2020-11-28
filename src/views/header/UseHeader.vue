<template>
  <a-layout-header class="header">
    <a-row>
      <a-col :span="11"><use-bread-crumb /></a-col>
      <a-col :span="11"><use-icons /></a-col>
      <a-col :span="2"><use-avatar /></a-col>
    </a-row>
    <a-row><use-tabs /></a-row>
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
  height: $header-height;
  /* margin-left: 7px; */
  border: $common-border;
  background-color: white;

  .ant-col + .ant-col {
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
  }
  /* .trigger {                         */
  /*   padding: 0 20px;                 */
  /*   font-size: 18px;                 */
  /*   line-height: $subheader1-height; */
  /*   cursor: pointer;                 */
  /*   transition: color 0.3s;          */
  /*   &:hover {                        */
  /*     color: #1890ff;                */
  /*   }                                */
  /* }                                  */
}

.ant-layout-header {
  padding: 0;
  line-height: 1em;
}
</style>
