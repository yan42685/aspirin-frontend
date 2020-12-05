<template>
  <white-background>
    <h1>选课界面</h1>
    <div>
      <a-tabs size="default" type="card">
        <a-tab-pane key="1" tab="公共必修">
          Content of tab 1
        </a-tab-pane>
        <a-tab-pane key="2" tab="公共选修">
          Content of tab 2
        </a-tab-pane>
        <a-tab-pane key="3" tab="专业必修">
          Content of tab 3
        </a-tab-pane>
        <a-tab-pane key="4" tab="专业选修">
          Content of tab 4
        </a-tab-pane>
        <a-tab-pane key="4" tab="退选记录">
          Content of tab 5
        </a-tab-pane>
      </a-tabs>
    </div>
  </white-background>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WhiteBackground from "@/components/basic/WhiteBackground.vue";

export default defineComponent({
  components: { WhiteBackground },
  name: "ElectCourse",
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss"></style>
