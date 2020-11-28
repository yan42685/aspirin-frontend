<template>
  <div class="placeholder">
    <a-layout-header class="header">
      <a-row class="sub-header1">
        <a-col :span="12"><use-bread-crumb /></a-col>
        <a-col :span="12"><use-search-bar /></a-col>
      </a-row>
      <div class="sub-header2"><use-tab-bar /></div>
    </a-layout-header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UseBreadCrumb from "./component/UseBreadCrumb.vue";
import UseTabBar from "./component/UseTabBar.vue";
import UseSearchBar from "./component/UseSearchBar.vue";

export default defineComponent({
  components: { UseBreadCrumb, UseSearchBar, UseTabBar },
  name: "UseHeader",
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss">
.placeholder {
  height: $header-height;
}
.header {
  position: fixed;
  width: 100%;
  height: $header-height;
  border: $common-border;
  background-color: white;

  .sub-header1 {
  }

  .sub-header2 {
    margin-top: -8px;
    border: {
      top: $common-border;
    }
  }

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
