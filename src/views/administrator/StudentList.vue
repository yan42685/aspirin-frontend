<template>
  <white-background :loading="loading">
    <a-modal
      title="修改个人信息"
      v-model:visible="modalVisible"
      @ok="handleConfirmModify"
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

    <div v-if="!loading">
      <a-table
        rowKey="id"
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
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
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { getRequest } from "@/utils/request";
import WhiteBackground from "@/components/basic/WhiteBackground.vue";
import { Student } from "@/api/rest-api";
import { messenger } from "@/utils/my-ant-design-vue";

export default defineComponent({
  name: "StudentList",
  components: { WhiteBackground },
  setup() {
    const data = reactive({
      loading: true,
      modalVisible: false,
      form: {
        id: "",
        name: "",
        age: "",
        birthday: "",
      },
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
      handleModify(record: Student) {
        Object.assign(data.form, record);
        data.modalVisible = true;
      },
      handleConfirmModify() {
        data.modalVisible = false;
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
      },
      handleDelete(record: Student) {
        getRequest("/api/administrator/deleteStudent", { id: record.id }).then(
          (res) => {
            n;
          }
        );
      },
    });

    // 初始化table
    getRequest("/api/administrator/allStudents").then((res) => {
      data.loading = false;
      data.dataSource = res.data as Student[];
    });

    getRequest("/api/administrator/add", { a: 3, b: 4 }).then((res) => {
      console.log("加法结果");
      console.log(res.data);
    });

    return { ...toRefs(data) };
  },
});
</script>

<style scoped lang="scss">
</style>