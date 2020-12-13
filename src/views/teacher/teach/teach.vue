<template>
  <div class="card-container">
    <use-card class="card-right" :loading="cardRightLoading">
      <h1>功能开发中...</h1>
    </use-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import UseCard from "@/components/basic/UseCard.vue";
import { getRequest, putRequest } from "@/utils/request";
import { store } from "@/store";
import { messenger } from "@/utils/my-ant-design-vue";

export default defineComponent({
  components: {
    UseCard
  },
  name: "TeacherTeach",
  setup() {
    const data = reactive({
      cardRightLoading: true
    });

    return { ...toRefs(data) };
  }
});
</script>

<style scoped lang="scss">
@import "./teach.scss";
</style>

