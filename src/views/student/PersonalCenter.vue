<template>
  <div class="card-container">
    <use-card class="card-left" :loading="cardLeftLoading">
      <a-avatar :size="85" class="avatar">
        <template #icon><img :src="userInfo.avatarUrl" alt=""/></template>
      </a-avatar>
      <h2>{{ userInfo.realName }}</h2>
      <ul>
        <li>{{ userInfo.nickname }}</li>
        <li>{{ userInfo.gender }}</li>
        <li>{{ userInfo.faculty }}</li>
        <li>{{ userInfo.specialty }}</li>
        <li>{{ userInfo.number }}</li>
        <li>{{ userInfo.admissionYear }}级</li>
        <li>{{ userInfo.phoneNumber }}</li>
        <li>{{ userInfo.contactInformation }}</li>
      </ul>
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
      cardLeftLoading: true,
      cardRightLoading: true,
      userInfo: {} as StudentDTO
    });
    getRequest("/api/student/information").then(result => {
      data.userInfo = result.data as StudentDTO;
      data.cardLeftLoading = false;
      data.cardLeftLoading = false;
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
    .avatar {
      display: inline-block;
      margin-bottom: 15px;
    }
    ul {
      font-size: 20px;
      display: inline-block;
      padding-top: 10px;
      width: 60%;
      border-top: 1px solid lightgray;
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
