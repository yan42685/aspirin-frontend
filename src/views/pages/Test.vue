<template>
  <div>
    <div><h1>Test One...</h1></div>
    <button @click="teacherLogin">click</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect } from "vue";
import { useRoute, RouteRecord, RouteLocation } from "vue-router";
import { RoleEnum } from "@/api/rest-api";
import { getRequest, putRequest } from "@/utils/request";

export default defineComponent({
  name: "Test",
  setup() {
    const currentRoute: RouteLocation = useRoute();
    watchEffect;

    const data = reactive({
      matched: null as null | RouteRecord[],
      async teacherLogin() {
        // await getRequest("/api/account/logout");
        //
        // const loginParams = {
        //   role: RoleEnum.TEACHER,
        //   username: "2222",
        //   password: "123456",
        //   rememberMe: true
        // };
        //
        // const result = await getRequest("/api/account/user-login", loginParams);
        // console.log(result.data);
        //
        // const result2 = await putRequest("/api/teacher/Information", {
        //   phoneNumber: "123456"
        // });
        // console.log(result2.data);
        // // 权限过滤的依据
        // // localStorage.setItem("aspirin-role", "teacher");
        // //
        // // store.commit("setUserRole", loginParams.role);
        // // switch (loginParams.role) {
        // //   case RoleEnum.STUDENT:
        // //     store.commit("getStudentInfo");
        // //     break;
        // // }
      }
    });
    return { ...toRefs(data) };
  }
});
</script>

<style scoped lang="scss"></style>
