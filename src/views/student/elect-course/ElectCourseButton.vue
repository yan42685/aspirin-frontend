<template>
  <a-button
    class="elect-button"
    type="primary"
    :loading="electLoading"
    :disabled="electLoading || electDisabled"
    @click="onElect"
    >{{ electText }}</a-button
  >
  <a-popconfirm
    title="确定退选吗?"
    @confirm="onDrop"
    :disabled="dropLoading || dropDisabled"
  >
    <a-button
      type="primary"
      :loading="dropLoading"
      :disabled="dropLoading || dropDisabled"
      >退选</a-button
    >
  </a-popconfirm>
</template>

<script lang="ts">
import { getRequest, postRequest, deleteRequest } from "@/utils/request";
import { messenger } from "@/utils/my-ant-design-vue";
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "ElectCourseButton",
  props: {
    courseDetailId: String
  },
  setup(props) {
    const data = reactive({
      electLoading: false,
      electDisabled: false,
      electText: "选课",
      dropLoading: false,
      dropDisabled: false,
      onElect: async () => {
        data.electLoading = true;
        const result: any = await postRequest("/api/student/elective", {
          courseDetailId: props.courseDetailId
        });
        data.electLoading = false;
        if (result.code === 0) {
          messenger.success("选课成功");
          data.electDisabled = true;
          data.electText = "已选";
          data.dropDisabled = false;
        } else {
          messenger.error(`选课失败: ${result.message}`);
        }
      },
      onDrop: async () => {
        data.dropLoading = true;
        console.log(props.courseDetailId);
        const result: any = await deleteRequest("/api/student/elective", {
          courseDetailId: props.courseDetailId
        });
        data.dropLoading = false;
        if (result.code === 0) {
          messenger.success("退选成功");
          data.dropDisabled = true;
          data.electDisabled = false;
          data.electText = "选课";
        } else {
          messenger.error(`退选失败: ${result.message}`);
        }
      }
    });
    return {
      ...toRefs(data)
    };
  }
});
</script>

<style scoped lang="scss">
.elect-button {
  margin-right: 15px;
}
</style>
