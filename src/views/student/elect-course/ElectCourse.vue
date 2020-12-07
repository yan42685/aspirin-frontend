<template>
  <white-background :loading="loading">
    <div v-if="!loading">
      <h1>选课界面</h1>
      <div>
        <a-tabs size="default" type="card" class="tables">
          <a-tab-pane key="1" tab="公共必修">
            <!-- scroll可以固定table的长度，然后内部滑动 -->
            <a-table
              rowKey="courseNumber"
              :columns="electColumns"
              :data-source="commonCompulsory"
              :pagination="false"
              :scroll="{ y: 420 }"
            >
              <template #action="{record}">
                <elect-course-button
                  :courseDetailId="record.id"
                  :courseStatus="record.status"
                />
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="2" tab="公共选修">
            <a-table
              rowKey="courseNumber"
              :columns="electColumns"
              :data-source="commonElective"
              :pagination="false"
              :scroll="{ y: 450 }"
            >
              <template #action="{record}">
                <elect-course-button
                  :courseDetailId="record.id"
                  :courseStatus="record.status"
                />
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="3" tab="专业必修">
            <a-table
              rowKey="courseNumber"
              :columns="electColumns"
              :data-source="professionalCompulsory"
              :pagination="false"
              :scroll="{ y: 450 }"
            >
              <template #action="{record}">
                <elect-course-button
                  :courseDetailId="record.id"
                  :courseStatus="record.status"
                />
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="4" tab="专业选修">
            <a-table
              rowKey="courseNumber"
              :columns="electColumns"
              :data-source="professionalElective"
              :pagination="false"
              :scroll="{ y: 450 }"
            >
              <template #action="{record}">
                <elect-course-button
                  :courseDetailId="record.id"
                  :courseStatus="record.status"
                />
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="5" tab="退选记录">
            <a-table
              :columns="dropColumns"
              :data-source="dropCourseRecords"
              :pagination="false"
              :scroll="{ y: 450 }"
            >
            </a-table>
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
import { ElectiveDTO, CourseTypeEnum, CourseDropDTO } from "@/api/rest-api";
import { store } from "@/store";
import { bigPage } from "@/api/request-params";
import { autoRetryAsync } from "@/utils/basic-lib";
import ElectCourseButton from "./ElectCourseButton.vue";

export default defineComponent({
  components: { WhiteBackground, ElectCourseButton },
  name: "ElectCourse",
  setup() {
    const data = reactive({
      courseType: CourseTypeEnum,
      loading: true,
      commonCompulsory: [] as ElectiveDTO[],
      commonElective: [] as ElectiveDTO[],
      professionalCompulsory: [] as ElectiveDTO[],
      professionalElective: [] as ElectiveDTO[],
      electColumns: [
        { title: "课程名", dataIndex: "courseName" },
        { title: "课程编号", dataIndex: "courseNumber" },
        { title: "教师名", dataIndex: "teacherName" },
        {
          title: "星期几",
          dataIndex: "dayOfTheWeek",
          // 点击排序的规则
          sorter: (a: ElectiveDTO, b: ElectiveDTO) =>
            a.dayOfTheWeek - b.dayOfTheWeek,
          width: 150
        },
        {
          title: "第几节课",
          dataIndex: "schedulingTime",
          sorter: (a: ElectiveDTO, b: ElectiveDTO) =>
            a.schedulingTime - b.schedulingTime,
          width: 150
        },
        { title: "地点", dataIndex: "classroomName" },
        { title: "学时", dataIndex: "period" },
        { title: "学分", dataIndex: "credit" },
        {
          title: "操作",
          key: "action",
          width: 260,
          slots: { customRender: "action" }
        }
      ],
      dropCourseRecords: [] as CourseDropDTO[],
      dropColumns: [
        { title: "课程名", dataIndex: "courseName" },
        { title: "教师名", dataIndex: "teacherName" },
        { title: "课程类型", dataIndex: "type" },
        { title: "地点", dataIndex: "classroomName" },
        { title: "学时", dataIndex: "period" },
        { title: "学分", dataIndex: "credit" },
        { title: "退课时间", dataIndex: "createTime" }
      ],

      getDataSourceByCourseType: (type: CourseTypeEnum) => {
        switch (type) {
          case CourseTypeEnum.COMMON_COMPULSORY:
            return data.commonCompulsory;
          case CourseTypeEnum.COMMON_ELECTIVE:
            return data.commonElective;
          case CourseTypeEnum.PROFESSIONAL_COMPULSORY:
            return data.professionalCompulsory;
          case CourseTypeEnum.PROFESSIONAL_ELECTIVE:
            return data.professionalElective;
          default:
            return null;
        }
      },
      onElect: (event: any, courseNumber: string, type: CourseTypeEnum) => {
        const element = event.target as HTMLElement;
        element.textContent = "已选";
        element.setAttribute("disabled", "true");
        const dataSource = data.getDataSourceByCourseType(type);
        if (dataSource) {
          const target = dataSource.find(
            record => record.courseNumber === courseNumber
          );
          console.log(target);
        }
      },

      onDrop: (event: any, courseNumber: string, type: CourseTypeEnum) => {
        const element = event.target as HTMLElement;
        const dataSource = data.getDataSourceByCourseType(type);
        if (dataSource) {
          const target = dataSource.find(
            record => record.courseNumber === courseNumber
          );
          console.log(target);
        }
      }
    });

    async function fetchAllInfo() {
      if (!store.state.student.info.username) {
        return false;
      }

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
      // NOTE: 如果后面要级联获取属性，这里必须写any类型，省略类型就是unknown类型会报错
      const result5: any = await getRequest(
        "/api/student/course-drop-record",
        bigPage
      );

      data.commonCompulsory = result1.data as ElectiveDTO[];
      data.commonElective = result2.data as ElectiveDTO[];
      data.professionalCompulsory = result3.data as ElectiveDTO[];
      data.professionalElective = result4.data as ElectiveDTO[];
      data.dropCourseRecords = result5.data.records as CourseDropDTO[];

      data.loading = false;
      return true;
    }

    // 因为刚开始vuex还没来得及获取数据，所以这里会获取不到semester, 需要延时重试
    autoRetryAsync(fetchAllInfo);

    return { ...toRefs(data) };
  }
});
</script>

<style scoped lang="scss">
.tables {
  margin: 30px 80px;
}
</style>
