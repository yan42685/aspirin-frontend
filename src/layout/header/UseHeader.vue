<template>
  <a-layout-header class="header">
    <a-row>
      <a-col :span="12"><use-bread-crumb /></a-col>
      <a-col :span="12"><use-icons /> <use-avatar /></a-col>
    </a-row>
    <use-tab-bar />
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UseIcons from "./component/UseIcons.vue";
import UseAvatar from "./component/UseAvatar.vue";
import UseBreadCrumb from "./component/UseBreadCrumb.vue";
import UseTabBar from "./component/UseTabBar.vue";

export default defineComponent({
  components: { UseIcons, UseAvatar, UseBreadCrumb, UseTabBar },
  name: "UseHeader",
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss">
.header {
  height: $header-height;
  border: $common-border;
  background-color: white;

  .ant-col + .ant-col {
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
  }
}

.ant-layout-header {
  padding: 0;
  line-height: 1em;
}
</style>
