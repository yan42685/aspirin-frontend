<template>
  <white-background :loading="loading">
    <div v-if="!loading">
      <h1>选课界面</h1>
      <div>
        <a-tabs size="default" type="card" class="tables">
          <a-tab-pane key="1" tab="公共必修">
            <a-table
              :columns="electColumns"
              :data-source="commonCompulsory"
              :pagination="false"
            >
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="2" tab="公共选修">
            <a-table
              :columns="electColumns"
              :data-source="commonElective"
              :pagination="false"
            >
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="3" tab="专业必修">
            <a-table
              :columns="electColumns"
              :data-source="professionalCompulsory"
              :pagination="false"
            >
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="4" tab="专业选修">
            <a-table
              :columns="electColumns"
              :data-source="professionalElective"
              :pagination="false"
            >
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="5" tab="退选记录">
            退课记录
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </white-background>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import WhiteBackground from "@/components/basic/WhiteBackground.vue";
import { getRequest } from "@/utils/request";
import { CourseDetailDTO, CourseTypeEnum } from "@/api/rest-api";
import { store } from "@/store";
import { eventBus } from "@/utils/event-bus";

export default defineComponent({
  components: { WhiteBackground },
  name: "ElectCourse",
  setup() {
    const data = reactive({
      loading: true,
      commonCompulsory: [] as CourseDetailDTO[],
      commonElective: [] as CourseDetailDTO[],
      professionalCompulsory: [] as CourseDetailDTO[],
      professionalElective: [] as CourseDetailDTO[],
      electColumns: [
        { title: "课程名", dataIndex: "courseName" },
        { title: "教师名", dataIndex: "teacherName" },
        {
          title: "星期",
          dataIndex: "dayOfTheWeek",
          // 点击排序的规则
          sorter: (a: CourseDetailDTO, b: CourseDetailDTO) =>
            a.dayOfTheWeek - b.dayOfTheWeek
        },
        {
          title: "第几节课",
          dataIndex: "schedulingTime",
          sorter: (a: CourseDetailDTO, b: CourseDetailDTO) =>
            a.schedulingTime - b.schedulingTime
        },
        { title: "地点", dataIndex: "classroomName" },
        { title: "学时", dataIndex: "period" },
        { title: "学分", dataIndex: "credit" }
      ]
    });

    async function fetchCourseDetail() {
      const semester = store.state.student.info.semester;
      const result1 = await getRequest("/api/student/available-course-list", {
        semester: semester,
        courseType: CourseTypeEnum.COMMON_COMPULSORY
      });
      const result2 = await getRequest("/api/student/available-course-list", {
        semester: semester,
        courseType: CourseTypeEnum.COMMON_ELECTIVE
      });
      const result3 = await getRequest("/api/student/available-course-list", {
        semester: semester,
        courseType: CourseTypeEnum.PROFESSIONAL_COMPULSORY
      });
      const result4 = await getRequest("/api/student/available-course-list", {
        semester: semester,
        courseType: CourseTypeEnum.PROFESSIONAL_ELECTIVE
      });

      data.commonCompulsory = result1.data as CourseDetailDTO[];
      data.commonElective = result2.data as CourseDetailDTO[];
      data.professionalCompulsory = result3.data as CourseDetailDTO[];
      data.professionalElective = result4.data as CourseDetailDTO[];

      data.loading = false;
    }

    // 每次更新学生信息都会重新获取选课信息
    eventBus.on("studentInfoFetched", () => {
      fetchCourseDetail();
    });

    return { ...toRefs(data) };
  }
});
</script>

<style scoped lang="scss">
.tables {
  margin: 30px 45px;
}
</style>
