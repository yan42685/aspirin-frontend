<template>
  <!-- 必须要有一个根标签，不然transition无法作用于router-view -->
  <div class="container">
    <div class="header">
      <a-button type="primary">
        <!-- <template #icon><SearchOutlined /></template> -->
        Search
      </a-button>
    </div>

    <white-background :loading="loading">
      <div v-if="!loading">
        <a-table
          rowKey="id"
          :columns="columns"
          :data-source="dataSource"
          :pagination="pagination"
          :scroll="{ y: 400 }"
        >
          <template #operation="{ record }">
            <div>
              <span>
                <a style="margin: 0 5px" @click.stop="handleModify(record)">
                  修改
                </a>
                <a-popconfirm
                  title="确定要删除吗?"
                  okText="确定"
                  cancelText="取消"
                  @confirm="handleDelete(record)"
                >
                  <a style="margin: 0 5px">删除</a>
                </a-popconfirm>
              </span>
            </div>
          </template>
        </a-table>
      </div>
    </white-background>

    <a-modal
      :title="modalTitle"
      v-model:visible="modalVisible"
      @ok="handleModalConfirm"
    >
      <a-form
        :model="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-form-item label="姓名">
          <a-input v-model:value="form.name" name="name" />
        </a-form-item>
        <a-form-item label="年龄" name="age">
          <a-input v-model:value="form.age" />
        </a-form-item>
        <a-form-item label="生日" name="birthday">
          <a-input v-model:value="form.birthday" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { getRequest, postRequest } from "@/utils/request";
import WhiteBackground from "@/components/basic/WhiteBackground.vue";
import { Student } from "@/api/rest-api";
import { messenger } from "@/utils/my-ant-design-vue";
import { notifyRequestResult } from "@/utils/ui/notify";

type ModalAction = "add" | "modify";
type StudentInput = { id: string; name: string; age: number; birthday: string };

export default defineComponent({
  name: "StudentList",
  components: { WhiteBackground },
  setup() {
    const data = reactive({
      loading: true,
      modalVisible: false,
      modalTitle: "",
      modalAction: "add" as ModalAction,
      form: {
        id: "",
        name: "",
        age: 0,
        birthday: "",
      } as StudentInput,
      dataSource: [] as Student[],
      columns: [
        {
          title: "姓名",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "年龄",
          dataIndex: "age",
          key: "age",
        },
        {
          title: "生日",
          dataIndex: "birthday",
          key: "birthday",
        },
        {
          title: "操作",
          dataIndex: "operation",
          key: "operation",
          slots: { customRender: "operation" },
        },
      ],
      pagination: {
        pageSize: 7, // 默认每页显示数量
        showQuickJumper: true, // 快速跳转
      },
      handleAdd() {
        data.modalTitle = "添加学生";
        data.form = {} as StudentInput;
        data.modalVisible = true;
        data.modalAction = "add";
      },
      handleModify(record: Student) {
        data.modalTitle = "修改学生";
        Object.assign(data.form, record);
        data.modalVisible = true;
        data.modalAction = "modify";
      },
      handleModalConfirm() {
        data.modalVisible = false;
        if (data.modalAction === "add") {
          postRequest("/api/administrator/addStudent", data.form).then(
            (res) => {
              if (res.code === 0) {
                messenger.success("添加成功");
                data.dataSource = res.data as Student[];
              } else {
                messenger.error(`添加失败，${res.message}`);
              }
            }
          );
        } else if (data.modalAction === "modify") {
          getRequest("/api/administrator/updateStudent", data.form).then(
            (res) => {
              if (res.code === 0) {
                messenger.success("修改成功");
                data.dataSource = res.data as Student[];
              } else {
                messenger.error(`修改失败, ${res.message}`);
              }
            }
          );
        }
      },
      handleDelete(record: Student) {
        getRequest("/api/administrator/deleteStudent", { id: record.id }).then(
          (res) => {
            notifyRequestResult(res, "删除成功", "删除失败");
          }
        );
      },
    });

    // 初始化table
    getRequest("/api/administrator/allStudents").then((res) => {
      data.loading = false;
      data.dataSource = res.data as Student[];
    });

    return { ...toRefs(data) };
  },
});
</script>

<style scoped lang="scss">
</style>