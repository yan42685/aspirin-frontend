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
            v-model:value="formInline.user"
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
          <a-form-item>
            <a-radio-group v-model:value="loginType">
              <a-radio value="STUDENT">学生</a-radio>
              <a-radio value="TEACHER"> 教师 </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-button
            block
            type="primary"
            html-type="submit"
            :disabled="formInline.user === '' || formInline.password === ''"
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

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined
  },
  name: "Login",
  setup() {
    const data = reactive({
      formInline: {
        user: "123",
        password: "123"
      },
      loginType: "STUDENT",
      handleSubmit(e: any) {
        // console.log(this.formInline);
      }
    });
    // const { x, y } = getMousePosition();
    // const message = computed(() => `(${x.value}, ${y.value})`);
    //
    // const showClickPosition = () => {
    //   messenger.info(message.value);
    // };

    // onMounted(() => {
    //   document.addEventListener("click", showClickPosition);
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
