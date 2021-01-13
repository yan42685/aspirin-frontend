<template>
  <white-background :loading="loading">
    <h1>影厅列表</h1>
    <a-modal :title="modalTitle" v-model:visible="modalVisible" @ok="modalOk">
      <div class="form">
        <a-label>影厅名称</a-label>
        <a-input v-model:value="currentHall.name" />
      </div>
    </a-modal>
    <div v-if="!loading">
      <!-- scroll可以固定table的长度，然后内部滑动 -->
      <a-table
        rowKey="courseNumber"
        :columns="columns"
        :data-source="hallList"
        :pagination="false"
        :scroll="{ y: 400 }"
      >
        <template #action="{ record }">
          <a @click="modifyHall(record)">修改</a>&nbsp;
          <a @click="addHall()">添加</a>&nbsp;
          <a @click="deleteHall(record.id)">删除</a>
        </template>
      </a-table>
    </div>
  </white-background>
</template>

<script lang="ts">
import { Hall } from "@/api/movie-rest-api";
import { messenger } from "@/utils/my-ant-design-vue";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "@/utils/request";
import { defineComponent, reactive, toRefs } from "vue";
import WhiteBackground from "@/components/basic/WhiteBackground";

type Action = "add" | "modify";

export default defineComponent({
  name: "MovieHall",
  components: { WhiteBackground },

  setup() {
    const data = reactive({
      loading: false,
      modalAction: "modify" as Action,
      modalVisible: false,
      modalTitle: "",
      columns: [
        { title: "影厅名称", dataIndex: "name" },
        {
          title: "操作",
          key: "action",
          slots: { customRender: "action" },
          width: 260,
        },
      ],
      hallList: [] as Hall[],

      // modal里保存的hall信息
      currentHall: {} as Hall,
      seats: [[0]] as number[][],
    });

    const methods = reactive({
      modalOk() {
        if (data.modalAction === "add") {
          postRequest("/hall", data.currentHall).then((res) => {
            if (res.code === 0) {
              const list = res.data as Hall[];

              data.hallList = list;
              messenger.success("添加影厅成功");
            } else {
              messenger.error("添加影厅失败");
            }
          });
        } else if (data.modalAction === "modify") {
          putRequest("/hall", data.currentHall).then((res) => {
            if (res.code === 0) {
              const list = res.data as Hall[];
              console.log(res);

              console.log("1111", list);
              data.hallList = list;
              messenger.success("修改影厅成功");
            } else {
              messenger.error("修改影厅失败");
            }
          });
        }
        data.modalVisible = false;
      },
      modifyHall(record: Hall) {
        data.modalTitle = "修改";
        data.modalAction = "modify";
        data.modalVisible = true;
        data.currentHall = record;
        // TODO: 处理解析错误的情况
        data.seats = JSON.parse(record.seats);
      },
      addHall() {
        data.modalTitle = "添加";
        data.modalAction = "add";
        data.modalVisible = true;
        data.currentHall = {} as Hall;
        data.seats = [[0]];
      },
      deleteHall(id: number) {
        deleteRequest("/hall", { id: id }).then((res) => {
          if (res.code === 0) {
            const list = res.data as Hall[];
            data.hallList = list;
          } else {
            messenger.error("删除影厅失败");
          }
        });
      },

      addRow() {
        data.seats.push([0]);
      },
      deleteRow(index: number) {
        data.seats.splice(index, 1);
      },
    });

    async function fetchInfo() {
      const request = getRequest("/hall/list");
      const result = await request;
      if (result.code !== 0) {
        messenger.warn("请求影厅列表失败");
        return;
      }
      data.hallList = result.data as Hall[];
      data.loading = false;
    }

    fetchInfo();

    return { ...toRefs(data), ...toRefs(methods) };
  },
});
</script>

<style scoped lang="scss"></style>
