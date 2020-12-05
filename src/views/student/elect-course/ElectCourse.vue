<template>
  <white-background :loading="loading">
    <div v-if="!loading">
      <h1>选课界面</h1>
      <div>
        <a-tabs size="default" type="card">
          <a-tab-pane key="1" tab="公共必修">
            {{ commonCompulsory[0].id }}
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
      professionalElective: [] as CourseDetailDTO[]
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

<style scoped lang="scss"></style>
