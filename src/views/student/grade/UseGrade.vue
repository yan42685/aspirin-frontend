<template>
  <white-background :loading="loading">
    <div v-if="!loading">
      <a-dropdown>
        <template #overlay>
          <a-menu @click="handleItemClick">
            <!-- 从1 ~ semester -->
            <a-menu-item v-for="i in semester" :key="i"
              >第 {{ i }} 学期</a-menu-item
            >
          </a-menu>
        </template>
        <a-button> 第 {{ chosenSemester }} 学期 <DownOutlined /> </a-button>
      </a-dropdown>
      <a-table
        rowKey="courseNumber"
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        :scroll="{ y: 400 }"
      >
      </a-table>
    </div>
  </white-background>
</template>

<script lang="ts">
import { GradeDTO, JsonWrapper, IPage } from "@/api/rest-api";
import { defineComponent, reactive, toRefs } from "vue";
import { autoRetryUtilFetchedStudentInfo } from "@/utils/basic-lib";
import { store } from "@/store";
import WhiteBackground from "@/components/basic/WhiteBackground.vue";
import { DownOutlined } from "@ant-design/icons-vue";
import { getRequest } from "@/utils/request";

export default defineComponent({
  name: "UseGrade",
  components: { WhiteBackground, DownOutlined },
  setup() {
    const data = reactive({
      loading: true,
      semester: 0,
      chosenSemester: 0,
      semesterText: "",
      handleItemClick: (target: any) => {
        data.chosenSemester = target.key;
        data.dataSource = data.gradesBySemester[target.key - 1];
      },
      columns: [
        { title: "课程名", dataIndex: "courseName" },
        { title: "课程编号", dataIndex: "courseNumber" },
        { title: "教师", dataIndex: "teacherName" },
        { title: "课程类型", dataIndex: "type" },
        { title: "学分", dataIndex: "credit" },
        { title: "学时", dataIndex: "period" },
        { title: "平时分", dataIndex: "regularScores" },
        { title: "考试分", dataIndex: "examScores" },
        { title: "总分", dataIndex: "finalScores" }
      ],
      gradesBySemester: [] as GradeDTO[][],
      dataSource: [] as GradeDTO[]
    });

    async function fetchInfo() {
      const semester = store.state.student.info.semester;
      // 防止请求过多
      data.semester = semester < 10 ? semester : 10;

      const requests = [] as Promise<JsonWrapper<unknown>>[];
      for (let i = 1; i <= semester; i++) {
        requests.push(
          getRequest("/api/student/grade", {
            semester: i,
            current: 1,
            size: 99999
          })
        );
      }

      const results = await Promise.all(requests);
      results.forEach(result => {
        const page = result.data as IPage<GradeDTO>;
        const records = page.records;
        data.gradesBySemester.push(records);
      });

      if (semester > 0) {
        data.chosenSemester = semester;
        data.dataSource = data.gradesBySemester[semester - 1];
        data.semesterText = `第${data.semester}学期`;
      }

      data.loading = false;
    }

    autoRetryUtilFetchedStudentInfo(fetchInfo);

    return { ...toRefs(data) };
  }
});
</script>

<style scoped lang="scss"></style>
