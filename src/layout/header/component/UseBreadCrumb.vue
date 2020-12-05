<template>
  <a-breadcrumb>
    <a-breadcrumb-item href="">
      <a-icon type="home" />
    </a-breadcrumb-item>
    <a-breadcrumb-item href="">
      <a-icon type="user" />
      <span>Application List</span>
    </a-breadcrumb-item>
    <a-breadcrumb-item>
      Application
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UseBreadCrumb",
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss">
.ant-breadcrumb {
  text-align: left;
  height: 80%;
  line-height: $subheader1-height;
}
</style>
