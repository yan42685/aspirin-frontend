<template>
  <white-background :loading="loading">
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
          <elect-course-button
            :courseDetailId="record.id"
            :courseStatus="record.status"
          />
        </template>
      </a-table>
    </div>
  </white-background>
</template>

<script lang="ts">
import { Hall } from "@/api/movie-rest-api";
import { messenger } from "@/utils/my-ant-design-vue";
import { getRequest } from "@/utils/request";
import { defineComponent, reactive, toRefs } from "vue";
import WhiteBackground from "@/components/basic/WhiteBackground";

export default defineComponent({
  name: "MovieHall",
  components: { WhiteBackground },

  setup() {
    const data = reactive({
      loading: false,
      chooseDisabled: true,
      columns: [
        { title: "影厅名称", dataIndex: "name" },
        {
          title: "操作",
          key: "action",
          width: 260,
        },
      ],
      hallList: [] as Hall[],
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

    return { ...toRefs(data) };
  },
});
</script>

<style scoped lang="scss"></style>
