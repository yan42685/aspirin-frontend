<template>
  <white-background :loading="loading">
    <h1>影厅列表</h1>
    <a-modal :title="modalTitle" v-model:visible="modalVisible" @ok="modalOk">
      <a-input-group>
        <span class="modal-error-message">{{ modalErrorMessage }}</span>
        <a-input
          addon-before="影厅名称"
          v-model:value="currentHall.name"
          @blur="checkDuplicateName"
          @change="clearErrorMessage"
        />
        <div class="add-row-button">
          <a-button type="primary" @click="addRow">添加行</a-button>
        </div>
        <div class="hall-seats-label">影片座位</div>
        <ul class="text-ul">
          <li v-for="(row, rowIndex) in seats" :key="rowIndex">
            <select @change="updateRow($event, rowIndex)">
              <option
                v-for="i in 12"
                :key="i"
                :value="i"
                :selected="i === seats[rowIndex].length"
              >
                {{ i }}
              </option>
            </select>
            <a class="delete-row-button" @click="deleteRow(rowIndex)">
              <MinusCircleOutlined />
            </a>
          </li>
        </ul>
      </a-input-group>
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
          <a @click="updateHall(record)">修改</a>&nbsp;
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
import { MinusCircleOutlined } from "@ant-design/icons-vue";
import _ from "lodash";

type Action = "add" | "modify";

export default defineComponent({
  name: "MovieHall",
  components: { WhiteBackground, MinusCircleOutlined },

  setup() {
    const data = reactive({
      loading: false,
      modalAction: "modify" as Action,
      modalVisible: false,
      modalTitle: "",
      modalErrorMessage: "",
      currentPage: 1,
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
      async fetchInfo() {
        const request = getRequest("/hall/list");
        const result = await request;
        if (result.code !== 0) {
          messenger.warn("请求影厅列表失败");
          return;
        }
        data.hallList = result.data as Hall[];
        data.loading = false;
      },
      modalOk() {
        data.currentHall.seats = JSON.stringify(data.seats);
        if (data.modalAction === "add") {
          if (data.modalErrorMessage === "名称已存在") {
            messenger.error("影厅名称已存在, 无法添加");
            return;
          }
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
      updateHall(record: Hall) {
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
            messenger.success("删除影厅成功");
          } else {
            messenger.error("删除影厅失败");
          }
        });
      },

      addRow() {
        data.seats.push([0]);
      },
      updateRow(event: any, row: number) {
        const target = event.target;
        let col = 0;
        if (target) {
          // 字符串转换成数字
          col = +target.value;
          console.log("col", col);
        }

        data.seats[row] = [];
        for (let i = 0; i < col; i++) {
          data.seats[row].push(0);
        }
      },
      deleteRow(row: number) {
        data.seats.splice(row, 1);
      },

      checkDuplicateName() {
        const fn = () => {
          if (data.modalAction === "add") {
            getRequest("/hall/isNameExists", {
              name: data.currentHall.name,
            }).then((res) => {
              if (res.data === true) {
                data.modalErrorMessage = "名称已存在";
              }
            });
          }
        };
        _.throttle(fn, 500)();
      },
      clearErrorMessage() {
        data.modalErrorMessage = "";
      },
    });

    methods.fetchInfo();

    return { ...toRefs(data), ...toRefs(methods) };
  },
});
</script>

<style scoped lang="scss">
.modal-error-message {
  color: red;
}

.add-row-button {
  display: inline-block;
  margin-left: 80%;
  margin-top: 12px;
}

.delete-row-button {
  display: inline-block;
  font-size: 18px;
  color: red;
  line-height: 18px;
  margin-left: 70%;
}

.text-ul {
  font-size: 14px;
}
</style>
