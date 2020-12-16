<template>
  <white-background :loading="loading">
    <div v-if="!loading">
      <a-tabs
        default-active-key="1"
        :activeKey="activeKey"
        @tabClick="handleTabsClick"
      >
        <a-tab-pane key="1" tab="授课表">
          <a-table
            rowKey="courseNumber"
            :columns="columns"
            :data-source="dataList"
            :pagination="false"
            :scroll="{ y: 400 }"
          >
            <template #tags="{ text: tags }">
              <span>
                <a-tag :color="tagsColor[tags]">
                  {{ tags }}
                </a-tag>
              </span>
            </template>
            <template #operation="{ record }">
              <div class="editable-row-operations">
                <span>
                  <a @click="handleGoToScore(record)">去打分</a>
                </span>
              </div>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="打分" :disabled="disabledScoreTabs">
          <TeacherScore :scoreToId="scoreToId" />
        </a-tab-pane>
      </a-tabs>
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
import TeacherScore from "./components/score/score.vue";

export default defineComponent({
  name: "TeacherTeach",
  components: { WhiteBackground, TeacherScore },
  setup() {
    const data = reactive({
      activeKey: "1",
      disabledScoreTabs: true,
      scoreToId: "",
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
          key: "courseNumber"
        },
        {
          title: "课程名",
          dataIndex: "courseName",
          key: "courseName"
        },
        {
          title: "学分",
          dataIndex: "credit",
          key: "credit"
        },
        {
          title: "学时",
          key: "period",
          dataIndex: "period"
        },
        {
          title: "操作",
          dataIndex: "operation",
          slots: { customRender: "operation" }
        }
      ],
      handleGoToScore(record: any) {
        const { courseDetailId } = record;
        data.scoreToId = courseDetailId;
        data.disabledScoreTabs = false;
        data.activeKey = "2";
      },
      handleTabsClick(key: string) {
        data.activeKey = key;
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
  }
});
</script>

<style scoped lang="scss">
@import "./teach.scss";
</style>
