<template>
  <white-background :loading="loading">
    <div v-if="!loading">
      <a-table 
        rowKey="teacherTeach"
        :columns="columns" 
        :data-source="dataList" 
        :pagination="false"
        :scroll="{ y: 400 }"
      >
        <template #tags="{ text: tags }">
          <span>
            <a-tag
              :color="tagsColor[tags]"
            >
              {{ tags }}
            </a-tag>
          </span>
        </template>
        <template #operation="{ record }">
          <div class="editable-row-operations">
            <span >
              <!-- <router-link to='/teacher/score'>去打分</router-link> -->
              <a @click="_handleGoToScore(record)">去打分</a>
            </span>
          </div>
        </template>
      </a-table>
    </div>
  </white-background>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { store } from "@/store";
import { TeacherTeachDTO } from "@/api/rest-api";
import { getRequest } from "@/utils/request";
import { autoRetryUtilFetchedTeacherInfo } from "@/utils/basic-lib";
import WhiteBackground from "@/components/basic/WhiteBackground.vue";
import { router } from "@/router";

export default defineComponent({
  name: "TeacherTeach",
  components: { WhiteBackground },
  setup() {
    const data = reactive({
      tagsColor: {
        "1": "geekblue", 
        "2": "green", 
        "3": "pink", 
        "4": "blue"
      },
      loading: true,
      dataList: [] as TeacherTeachDTO[],
      columns: [
        {
          title: "学期",
          dataIndex: "semester",
          key: "semester",
          slots: { customRender: "tags" }
        },
        {
          title: "课程编号",
          dataIndex: "courseNumber",
          key: "courseNumber",
        },
        {
          title: "课程名",
          dataIndex: "courseName",
          key: "courseName",
        },
        {
          title: "学分",
          dataIndex: "credit",
          key: "credit",
        },
        {
          title: "学时",
          key: "period",
          dataIndex: "period"
        },
        {
          title: '操作',
          dataIndex: 'operation',
          slots: { customRender: 'operation' },
        }
      ],
      _handleGoToScore(records: any) {
        const { courseDetailId } = records;
        router.push({path: '/teacher/teacher-score', query: {id: courseDetailId}})
      }
    });

    async function initTable() {
      data.loading = true;
      const result = await getRequest("/api/teacher/teaching-courses");
      const list = result.data as TeacherTeachDTO[];
      data.dataList = list;
      data.loading = false;
    }

    onMounted(() => autoRetryUtilFetchedTeacherInfo(initTable));

    return { ...toRefs(data) };
  },
});
</script>

<style scoped lang="scss">
@import "./teach.scss";
</style>
