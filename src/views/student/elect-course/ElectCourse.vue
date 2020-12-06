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
              :scroll="{ y: 350 }"
            >
              <template #action="{record}">
                <a
                  @click="
                    onElect(record.courseNumber, courseType.COMMON_COMPULSORY)
                  "
                  >选课</a
                >
                <a-divider type="vertical" />
                <a-popconfirm
                  v-if="commonCompulsory.length"
                  title="确定退选吗?"
                  @confirm="
                    onDrop(record.courseNumber, courseType.COMMON_COMPULSORY)
                  "
                >
                  <a>退选</a>
                </a-popconfirm>
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="2" tab="公共选修">
            <a-table
              rowKey="courseNumber"
              :columns="electColumns"
              :data-source="commonElective"
              :pagination="false"
              :scroll="{ y: 350 }"
            >
              <template #action="{record}">
                <a
                  @click="
                    onElect(record.courseNumber, courseType.COMMON_ELECTIVE)
                  "
                  >选课</a
                >
                <a-divider type="vertical" />
                <a-popconfirm
                  v-if="commonElective.length"
                  title="确定退选吗?"
                  @confirm="
                    onDrop(record.courseNumber, courseType.COMMON_ELECTIVE)
                  "
                >
                  <a>退选</a>
                </a-popconfirm>
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="3" tab="专业必修">
            <a-table
              rowKey="courseNumber"
              :columns="electColumns"
              :data-source="professionalCompulsory"
              :pagination="false"
              :scroll="{ y: 350 }"
            >
              <template #action="{record}">
                <a
                  @click="
                    onElect(
                      record.courseNumber,
                      courseType.PROFESSIONAL_COMPULSORY
                    )
                  "
                  >选课</a
                >
                <a-divider type="vertical" />
                <a-popconfirm
                  v-if="professionalCompulsory.length"
                  title="确定退选吗?"
                  @confirm="
                    onDrop(
                      record.courseNumber,
                      courseType.PROFESSIONAL_COMPULSORY
                    )
                  "
                >
                  <a>退选</a>
                </a-popconfirm>
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="4" tab="专业选修">
            <a-table
              rowKey="courseNumber"
              :columns="electColumns"
              :data-source="professionalElective"
              :pagination="false"
              :scroll="{ y: 350 }"
            >
              <template #action="{record}">
                <a
                  @click="
                    onElect(
                      record.courseNumber,
                      courseType.PROFESSIONAL_ELECTIVE
                    )
                  "
                  >选课</a
                >
                <a-divider type="vertical" />
                <a-popconfirm
                  v-if="professionalElective.length"
                  title="确定退选吗?"
                  @confirm="
                    onDrop(
                      record.courseNumber,
                      courseType.PROFESSIONAL_ELECTIVE
                    )
                  "
                >
                  <a>退选</a>
                </a-popconfirm>
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="5" tab="退选记录">
            <a-table
              :columns="dropColumns"
              :data-source="dropCourseRecords"
              :pagination="false"
              :scroll="{ y: 350 }"
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
import { CourseDetailDTO, CourseTypeEnum, CourseDropDTO } from "@/api/rest-api";
import { store } from "@/store";
import { bigPage } from "@/api/request-params";
import { autoRetryAsync } from "@/utils/basic-lib";

export default defineComponent({
  components: { WhiteBackground },
  name: "ElectCourse",
  setup() {
    const data = reactive({
      courseType: CourseTypeEnum,
      loading: true,
      commonCompulsory: [] as CourseDetailDTO[],
      commonElective: [] as CourseDetailDTO[],
      professionalCompulsory: [] as CourseDetailDTO[],
      professionalElective: [] as CourseDetailDTO[],
      electColumns: [
        { title: "课程名", dataIndex: "courseName" },
        { title: "课程编号", dataIndex: "courseNumber" },
        { title: "教师名", dataIndex: "teacherName" },
        {
          title: "星期几",
          dataIndex: "dayOfTheWeek",
          // 点击排序的规则
          sorter: (a: CourseDetailDTO, b: CourseDetailDTO) =>
            a.dayOfTheWeek - b.dayOfTheWeek,
          width: 150
        },
        {
          title: "第几节课",
          dataIndex: "schedulingTime",
          sorter: (a: CourseDetailDTO, b: CourseDetailDTO) =>
            a.schedulingTime - b.schedulingTime,
          width: 150
        },
        { title: "地点", dataIndex: "classroomName" },
        { title: "学时", dataIndex: "period" },
        { title: "学分", dataIndex: "credit" },
        {
          title: "操作",
          key: "action",
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
      onElect: (courseNumber: string, type: CourseTypeEnum) => {
        const dataSource = data.getDataSourceByCourseType(type);
        if (dataSource) {
          const target = dataSource.find(
            record => record.courseNumber === courseNumber
          );
          console.log(target);
        }
      },

      onDrop: (courseNumber: string, type: CourseTypeEnum) => {
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

      data.commonCompulsory = result1.data as CourseDetailDTO[];
      data.commonElective = result2.data as CourseDetailDTO[];
      data.professionalCompulsory = result3.data as CourseDetailDTO[];
      data.professionalElective = result4.data as CourseDetailDTO[];
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
