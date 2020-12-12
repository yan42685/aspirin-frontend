<template>
  <white-background :loading="loading">
    <div>hahahaah</div>
    <button @click="onClick">click me</button>
    <div class="course-table-container">
      <div id="courseTable"></div>
    </div>
    <div v-if="!loading">
      <!-- <div id="courseTable"></div> -->
    </div>
  </white-background>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import Timetables from "timetables";
import WhiteBackground from "@/components/basic/WhiteBackground.vue";

export default defineComponent({
  name: "CourseTable",
  components: { WhiteBackground },
  setup() {
    const data = reactive({
      loading: false
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
      for (let j = 0; j < 7; j++) {
        oneDayCourses.push("");
      }
      courseList.push(oneDayCourses);
    }
    courseList[0][3] = "语文";

    const styles = {
      Gheight: 50,
      leftHandWidth: 100,
      palette: ["#ff6633", "#eeeeee"]
    };

    let timeTable = null;
    const onClick = () => {
      timeTable = new Timetables({
        el: "#courseTable",
        timetables: courseList,
        week: week,
        timetableType: timetableType,
        gridOnClick: function(e: any) {
          console.log(e);
        },
        styles: styles
      });
    };

    return { ...toRefs(data), onClick };
  }
});
</script>

<style scoped lang="scss">
/* scoped样式需要加上::v-deep才能对动态生成的dom起作用 */
v::deep #coursesTable {
  padding: 15px 90px;
}
/* v::deep .course-table-container { */
/*   height: 40px;                   */
/*   width: 300px;                   */
/*   padding: 40px 40px;             */
/* }                                 */

::v-deep .Courses-head > div {
  text-align: center;
  font-size: 14px;
  line-height: 28px;
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
  line-height: 50px;
}

::v-deep .Courses-content li span {
  padding: 6px 2px;
  box-sizing: border-box;
  line-height: 18px;
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
