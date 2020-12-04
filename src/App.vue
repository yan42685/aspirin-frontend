<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { getRequest } from "./utils/request";
import { RoleEnum } from "@/api/rest-api";
import { LoginParams } from "./api/request-params";

export default defineComponent({
  setup() {
    const data = reactive({
      loginParams: {} as LoginParams
    });
    // 测试用的登录
    data.loginParams = {
      role: RoleEnum.STUDENT,
      username: "stu",
      password: "123456",
      rememberMe: true
    };
    getRequest("/api/account/user-login", data.loginParams).then(data =>
      console.log(data)
    );
  }
});
</script>

<style lang="scss">
@import "@/styles/global.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
