<template>
  <white-background :loading="loading">
    <div v-if="!loading">
      <h1>第 {{ semester }} 学期课程表</h1>
    </div>
    <!-- NOTE: courseTable节点不能根据loading状态动态渲染，否则会报错 -->
    <div id="courseTable"></div>
  </white-background>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import Timetables from "timetables";
import { store } from "@/store";
import { CourseDetailDTO, JsonWrapper } from "@/api/rest-api";
import { getRequest } from "@/utils/request";
import { autoRetryUtilFetchedStudentInfo } from "@/utils/basic-lib";
import {
  renderCourseTable,
  updateCourseTable
} from "@/service/student/course-table";
import { eventBus } from "@/utils/event-bus";
import WhiteBackground from "@/components/basic/WhiteBackground.vue";

export default defineComponent({
  name: "CourseTable",
  components: { WhiteBackground },
  setup() {
    const data = reactive({
      loading: true,
      semester: 0
    });

    async function helper(render: (list: CourseDetailDTO[]) => void) {
      data.loading = true;
      data.semester = store.state.student.info.semester;
      const result = await getRequest("/api/student/course-schedule", {
        semester: data.semester
      });
      const list = result.data as CourseDetailDTO[];
      render(list);
      data.loading = false;
    }

    async function initTable() {
      helper(renderCourseTable);
    }

    async function updateTable() {
      helper(updateCourseTable);
    }

    onMounted(() => autoRetryUtilFetchedStudentInfo(initTable));
    // BUG: 由于courseTable库的作者代码有问题，更新信息的时候侧栏会消失
    // eventBus.on("electiveUpdated", () =>
    //   autoRetryUtilFetchedStudentInfo(updateTable)
    // );

    return { ...toRefs(data) };
  }
});
</script>

<style scoped lang="scss">
/* scoped样式需要加上::v-deep才能对动态生成的dom起作用 */
::v-deep .Courses-head > div {
  text-align: center;
  /* font-size: 18px; */
  line-height: 1.5em;
}

::v-deep .left-hand-TextDom,
::v-deep .Courses-head {
  background-color: #fafafa;
}

::v-deep .Courses-leftHand {
  background-color: #f9f9fa;
  font-size: 14px;
}

::v-deep .Courses-leftHand .left-hand-index {
  color: #666;
}

::v-deep .Courses-leftHand .left-hand-name {
  color: #9c9c9c;
}

::v-deep .Courses-leftHand p {
  text-align: center;
  font-weight: 900;
}

::v-deep .Courses-head > div {
  border-left: none !important;
}

::v-deep .Courses-leftHand > div {
  padding-top: 5px;
  border-bottom: 1px dashed rgb(219, 219, 219);
}

::v-deep .Courses-leftHand > div:last-child {
  border-bottom: none !important;
}

::v-deep .left-hand-TextDom,
::v-deep .Courses-head {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
}

::v-deep .Courses-content > ul {
  border-bottom: 1px dashed rgb(219, 219, 219);
  box-sizing: border-box;
}

::v-deep .Courses-content > ul:last-child {
  border-bottom: none !important;
}

::v-deep .highlight-week {
  color: #02a9f5 !important;
}

::v-deep .Courses-content li {
  text-align: center;
  color: #666666;
}

::v-deep .Courses-content li span {
  /* 让文字居中 */
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 6px 2px;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 1.7em;
  border-radius: 8px;
  white-space: normal;
  word-break: break-all;
  /* cursor: pointer; */
}

::v-deep .grid-active {
  z-index: 9999;
}

::v-deep .grid-active span {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
