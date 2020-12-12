<template>
  <white-background :loading="loading">
    <h1>课程表</h1>
    <div v-if="!loading">
      <div id="courseTable"></div>
    </div>
  </white-background>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import Timetables from "timetables";
import { store } from "@/store";
import { CourseDetailDTO, JsonWrapper } from "@/api/rest-api";
import { getRequest } from "@/utils/request";
import { autoRetryUtilFetchedStudentInfo } from "@/utils/basic-lib";
import { renderCourseTable } from "@/service/student/course-table";
import WhiteBackground from "@/components/basic/WhiteBackground.vue";

export default defineComponent({
  name: "CourseTable",
  components: { WhiteBackground },
  setup() {
    const data = reactive({
      loading: false,
      semester: 0
    });

    const timetableType = [
      [{ index: "1", name: "8:00-8:45" }, 1],
      [{ index: "2", name: "8:55-9:40" }, 1],
      [{ index: "3", name: "9:55-10:40" }, 1],
      [{ index: "4", name: "10:50-11:35" }, 1],
      [{ index: "5", name: "14:00-14:45" }, 1],
      [{ index: "6", name: "14:55-15:40" }, 1],
      [{ index: "7", name: "15:55-16:40" }, 1],
      [{ index: "8", name: "16:55-17:40" }, 1],
      [{ index: "9", name: "19:00-19:45" }, 1],
      [{ index: "10", name: "19:55-20:40" }, 1],
      [{ index: "11", name: "20:55-21:40" }, 1],
      [{ index: "12", name: "21:55-22:40" }, 1]
    ];

    const week = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    const courseList = [] as string[][];
    for (let i = 0; i < 7; i++) {
      const oneDayCourses = [];
      for (let j = 0; j < 12; j++) {
        oneDayCourses.push("");
      }
      courseList.push(oneDayCourses);
    }
    courseList[0][3] = "高等数学@张阳\n教四305333333333333";
    courseList[0][2] = "高等数学@张阳\n教四305333333333333";

    const styles = {
      // 表格高度
      Gheight: 47,
      leftHandWidth: 100,
      palette: ["#ff6633", "#eeeeee"]
    };

    // let timeTable = null;
    // const renderCourseTable = () => {
    //   new Timetables({
    //     el: "#courseTable",
    //     timetables: courseList,
    //     week: week,
    //     timetableType: timetableType,
    //     gridOnClick: function(e: any) {
    //       console.log(e);
    //     },
    //     styles: styles
    //   });
    // };

    async function fetchInfo() {
      const semester = store.state.student.info.semester;
      const result = await getRequest("/api/student/course-schedule", {
        semester: semester
      });
      const courseList = result.data as CourseDetailDTO[];
      renderCourseTable(courseList);
    }
    onMounted(() => {
      autoRetryUtilFetchedStudentInfo(fetchInfo);
    });

    return { ...toRefs(data) };
  }
});
</script>

<style scoped lang="scss">
/* scoped样式需要加上::v-deep才能对动态生成的dom起作用 */
::v-deep .Courses-head > div {
  text-align: center;
  font-size: 14px;
  line-height: 1.7em;
}

::v-deep .left-hand-TextDom,
::v-deep .Courses-head {
  background-color: #fafafa;
}

::v-deep .Courses-leftHand {
  background-color: #f9f9fa;
  font-size: 12px;
}

::v-deep .Courses-leftHand .left-hand-index {
  color: #9c9c9c;
  margin-bottom: 4px !important;
}

::v-deep .Courses-leftHand .left-hand-name {
  color: #666;
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
  font-size: 14px;
  line-height: 1.7em;
}

::v-deep .Courses-content li span {
  /* 让文字居中 */
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 6px 2px;
  box-sizing: border-box;
  line-height: 1.7em;
  border-radius: 4px;
  white-space: normal;
  word-break: break-all;
  cursor: pointer;
}

::v-deep .grid-active {
  z-index: 9999;
}

::v-deep .grid-active span {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
