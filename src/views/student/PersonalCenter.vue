<template>
  <div class="card-container">
    <use-card class="card-left" :loading="cardLeftLoading">
      whatever content
    </use-card>
    <use-card class="card-right" :loading="cardRightLoading">
      whatever content
    </use-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { StudentDTO } from "@/api/rest-api";
import { getRequest } from "@/utils/request";
import UseCard from "@/components/basic/UseCard.vue";

export default defineComponent({
  components: { UseCard },
  name: "PersonalCenter",
  setup() {
    const data = reactive({
      cardLeftLoading: false,
      cardRightLoading: false,
      userInfo: {}
    });
    getRequest("/api/student/information").then(result => {
      data.userInfo = result.data as StudentDTO;
      data.cardLeftLoading;
    });
    return { ...toRefs(data) };
  }
});
</script>

<style scoped lang="scss">
.card-container {
  display: flex;
  justify-content: space-between;
  .card-left,
  .card-right {
    min-height: 80vh;
  }
  .card-left {
    width: 34%;
    &:hover {
      box-shadow: $base-card-box-shadow;
    }
  }
  .card-right {
    width: 64%;
    &:hover {
      box-shadow: $base-card-box-shadow;
    }
  }
}
</style>
