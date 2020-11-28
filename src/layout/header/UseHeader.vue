<template>
  <div class="placeholder">
    <a-layout-header class="header">
      <a-row>
        <a-col :span="12"><use-bread-crumb /></a-col>
        <a-col :span="12"><use-search-bar /></a-col>
      </a-row>
      <use-tab-bar />
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
