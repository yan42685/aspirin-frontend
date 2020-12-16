<template>
  <white-background :loading="loading">
    <div v-if="!loading">
      <a-table
        rowKey="teacherScore"
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
        <template #regularScores="{ text, index }">
          <div>
            <a-input
              v-if="index === editingKey"
              style="margin: -5px 0"
              :value="regularScoresValue"
              @change="
                e => handleChangeInputVal(e.target.value, 'regularScores')
              "
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template #examScores="{ text, index }">
          <div>
            <a-input
              v-if="index === editingKey"
              style="margin: -5px 0"
              :value="examScoresValue"
              @change="e => handleChangeInputVal(e.target.value, 'examScores')"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template #finalScores="{ text, index }">
          <div>
            <a-input
              v-if="index === editingKey"
              style="margin: -5px 0"
              :value="finalScoresValue"
              examScoresValue
              @change="e => handleChangeInputVal(e.target.value, 'finalScores')"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template #operation="{ record, index }">
          <div class="editable-row-operations">
            <span v-if="index === editingKey && editingKey !== -1">
              <a-popconfirm
                title="确定要打分吗?"
                cancelText="取消"
                okText="确定"
                @confirm="handleSubmit(record)"
              >
                <a style="margin: 0 5px">打分</a>
              </a-popconfirm>
              <a-popconfirm
                title="确定要修改吗?"
                cancelText="取消"
                okText="确定"
                @confirm="handleSubmitChange(record)"
              >
                <a style="margin: 0 5px">修改</a>
              </a-popconfirm>
              <a-popconfirm
                title="确定要提交吗?"
                cancelText="取消"
                okText="确定"
                @confirm="handleSubmitMark(record)"
              >
                <a style="margin: 0 5px">提交</a>
              </a-popconfirm>
              <a-popconfirm
                title="确定要取消吗?"
                cancelText="取消"
                okText="确定"
                @confirm="handleCancel"
              >
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a v-bind="record.submitted ? { disabled: 'disabled' } : {}" @click="handleEditNumber(record, index)">
                {{ !record.submitted ? '操作' : '已提交'}}
              </a>
            </span>
          </div>
        </template>
      </a-table>
    </div>
  </white-background>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { TeacherScoreDTO } from "@/api/rest-api";
import { getRequest, postRequest, putRequest } from "@/utils/request";
import { autoRetryUtilFetchedTeacherInfo } from "@/utils/basic-lib";
import WhiteBackground from "@/components/basic/WhiteBackground.vue";
import { messenger } from "@/utils/my-ant-design-vue";
import { router } from "@/router";
import { Modal } from "ant-design-vue";
const testData = {
  code: 0,
  data: {
    current: 0,
    pages: 0,
    records: [
      {
        courseDetailId: 0,
        courseName: "",
        courseNumber: "",
        credit: 0,
        examScores: 0,
        finalScores: 0,
        gradeId: 0,
        period: 0,
        regularScores: 0,
        semester: 0,
        specialtyName: "",
        studentName: "",
        studentNumber: "",
        submitted: false,
        type: ""
      }
    ]
  },
  message: ""
};
export default defineComponent({
  name: "TeacherScore",
  components: { WhiteBackground },
  setup(props, context) {
    const data = reactive({
      pageCurrent: 1,
      pageSize: 999,
      tagsColor: ["geekblue", "green", "geekblue", "green"],
      loading: true,
      editNumber: false,
      editingKey: -1,
      dataList: [] as TeacherScoreDTO[],
      regularScoresValue: "",
      finalScoresValue: "",
      examScoresValue: "",
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
          title: "学生姓名",
          key: "studentName",
          dataIndex: "studentName"
        },
        {
          title: "学生学号",
          key: "studentNumber",
          dataIndex: "studentNumber"
        },
        {
          title: "专业名",
          key: "specialtyName",
          dataIndex: "specialtyName"
        },
        {
          title: "平时分",
          key: "regularScores",
          dataIndex: "regularScores",
          slots: { customRender: "regularScores" }
        },
        {
          title: "考试分",
          key: "examScores",
          dataIndex: "examScores",
          slots: { customRender: "examScores" }
        },
        {
          title: "最终分数",
          key: "finalScores",
          dataIndex: "finalScores"
          // slots: { customRender: 'finalScores' }
        },
        {
          title: "操作",
          dataIndex: "operation",
          slots: { customRender: "operation" }
        }
      ],
      handleEditNumber(record: any, index: number) {
        const { regularScores, finalScores, examScores } = record;

        data.regularScoresValue = regularScores;
        data.finalScoresValue = finalScores;
        data.examScoresValue = examScores;
        data.editingKey = index;
        data.editNumber = true;
      },
      handleChangeInputVal(value: string, key: string) {
        switch (key) {
          case "regularScores":
            data.regularScoresValue = value;
            break;
          case "finalScores":
            data.finalScoresValue = value;
            break;
          case "examScores":
            data.examScoresValue = value;
            break;
          default:
            break;
        }
      },
      handleCancel() {
        data.regularScoresValue = "";
        data.finalScoresValue = "";
        data.examScoresValue = "";
        data.editingKey = -1;
        data.editNumber = false;
      },
      handleSubmit(record: any) {
        const { submitted } = record;
        data.handlePostMark(record);
      },
      handleSubmitChange(record: any) {
        const { submitted } = record;
        data.handlePutMark(record);
      },
      async handleSubmitMark(record: any) {
        data.loading = true;
        const { gradeId } = record;
        const result: any = await putRequest("/api/teacher/submit-mark", {
          gradeId
        });
        data.loading = false;
        if (result.code === 0) {
          messenger.success("提交成功");
          data.handleCancel();
          data.initTable();
        } else {
          messenger.error(`提交失败: ${result.message}`);
        }
      },
      async handlePostMark(record: any) {
        data.loading = true;
        const { gradeId } = record;
        const result: any = await postRequest("/api/teacher/mark", {
          examScores: data.examScoresValue,
          regularScores: data.regularScoresValue,
          gradeId
        });
        data.loading = false;
        if (result.code === 0) {
          messenger.success("提交成功");
          data.handleCancel();
          data.initTable();
        } else {
          messenger.error(`提交失败: ${result.message}`);
        }
      },
      async handlePutMark(record: any) {
        data.loading = true;
        const { gradeId } = record;
        const result: any = await putRequest("/api/teacher/mark", {
          examScores: data.examScoresValue,
          regularScores: data.regularScoresValue,
          gradeId
        });
        data.loading = false;
        if (result.code === 0) {
          messenger.success("修改成功");
          data.handleCancel();
          data.initTable();
        } else {
          messenger.error(`修改失败: ${result.message}`);
        }
      },
      async initTable() {
        const { attrs } = context;
        if (attrs.scoreToId === "") {
          Modal.info({
            title: '请重新选择课程进行打分',
            // onOk() {},
          });
          return;
        }
        data.loading = true;
        const res: any = await getRequest("/api/teacher/mark-page", {
          courseDetailId: attrs.scoreToId,
          current: data.pageCurrent,
          size: data.pageSize
        });

        if (!res.data) {
          Modal.info({
            title: res.message,
            // onOk() {},
          });
          return
        }
        const list = res.data.records as TeacherScoreDTO[];
        data.dataList = list;
        data.loading = false;
      }
    });

    onMounted(() => {
      autoRetryUtilFetchedTeacherInfo(data.initTable);
    });

    return { ...toRefs(data) };
  }
});
</script>

<style scoped lang="scss">
@import "./score.scss";
</style>
