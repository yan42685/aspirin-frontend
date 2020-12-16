<template>
  <div id="login">
    <!-- <h2>This is Login</h2>
    <p>{{ message }}</p>
    <button @click="loginRedirect">redirect</button> -->
    <div class="box">
      <h1>阿司匹林</h1>
      <a-form layout="horizontal" :model="formInline" @submit="handleSubmit">
        <a-form-item>
          <a-input
            v-model:value="formInline.username"
            placeholder="账号"
            style="width: 100%"
          >
            <template #prefix
              ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-model:value="formInline.password"
            type="password"
            placeholder="密码"
            style="width: 100%"
          >
            <template #prefix
              ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-select v-model:value="formInline.role" placeholder="请选择身份">
            <a-select-option value="STUDENT">
              学生
            </a-select-option>
            <a-select-option value="TEACHER">
              教师
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button
            block
            type="primary"
            html-type="submit"
            :disabled="formInline.username === '' || formInline.password === ''"
            :loading="btnLoading"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
// import { getMousePosition } from "../utils/mouse-position";
import {
  defineComponent,
  computed,
  reactive,
  onMounted,
  onUnmounted,
  toRefs
} from "vue";
import { messenger } from "../utils/my-ant-design-vue";
import { loginRedirect } from "@/utils/timeout-actions";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { getRequest } from "@/utils/request";
import { cookies } from "../utils/basic-lib";
import { store } from "@/store";
import { loginHook } from "@/utils/hooks/on-login";
import { router } from "@/router";

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined
  },
  name: "Login",
  setup() {
    const data = reactive({
      btnLoading: false,
      formInline: {
        username: "stu",
        password: "123456",
        role: "STUDENT",
        rememberMe: true
      },
      loginType: "STUDENT",
      async handleSubmit(e: any) {
        const { username, password, role } = data.formInline;
        const userNameRgx =
          username !== "" && /^[^\u4e00-\u9fa5]+$/.test(username);
        const pwdRgx = password !== "";
        if (!userNameRgx || !pwdRgx) {
          messenger.warning("请检查用户名和密码");
          return;
        }
        data.btnLoading = true;
        const results = await getRequest("/api/account/user-login", {
          ...data.formInline
        });
        data.btnLoading = false;

        if (results.code !== 0) {
          messenger.warning(results.message);
          return;
        }

        if (role === "STUDENT") {
          cookies.set("aspirin-role", "STUDENT");
          store.commit("setUserRole", "STUDENT");
          store.commit("getStudentInfo");
        } else {
          cookies.set("aspirin-role", "TEACHER");
          store.commit("setUserRole", "TEACHER");
          store.commit("getTeacherInfo");
        }

        loginHook();
        router.push("/home");
      }
    });
    // const { x, y } = getMousePosition();
    // const message = computed(() => `(${x.value}, ${y.value})`);
    //
    // const showClickPosition = () => {
    //   messenger.info(message.value);
    // };

    // onMounted(() => {
    // document.addEventListener("click", showClickPosition);
    // });
    // onUnmounted(() => {
    //   document.removeEventListener("click", showClickPosition);
    // });

    return {
      loginRedirect,
      ...toRefs(data)
    };
  }
});
</script>

<style scoped lang="scss">
#login {
  background-image: url("https://t1.hxzdhn.com/uploads/allimg/tuku2/1049116429-7.jpg");
  background-size: 100% 100%;
  height: 100vh;
  .box {
    h1 {
      color: #616161;
      font-weight: bold;
    }
    width: 30vw;
    background-color: #fdfdfdc7;
    padding: 30px 50px;
    border-radius: 8px;
    box-shadow: 0 0 10px 2px #383434;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // display: flex;
    // justify-content: center; /* 水平居中 */
    // align-items: center; /* 垂直居中 */
  }
}

::v-deep .ant-col.ant-form-item-control-wrapper {
  width: 100%;
}
</style>
