<template>
  <div class="avatar-container">
    <a-popover placement="rightTop">
      <template #content>
        <div>
          <router-link to="/student/personal-center"
            ><UserOutlined /> 个人中心</router-link
          >
        </div>
        <!-- TODO: 登出 -->
        <div class="logout-container">
          <a @click.stop.prevent="logout"><LogoutOutlined /> 登出</a>
        </div>
      </template>
      <a-avatar :size="65" class="avatar">
        <template #icon><img :src="avatarUrl" alt="" /></template>
      </a-avatar>
    </a-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { store } from "@/store";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons-vue";
import { logout } from "@/service/account";
import { autoRetryUtilFetchedUserInfo, cookies } from "@/utils/basic-lib";

export default defineComponent({
  name: "UseAvatar",
  components: {
    UserOutlined,
    LogoutOutlined,
  },
  setup() {
    const data = reactive({
      avatarUrl:
        // TODO: 仅为展示而设置, 正常情况应该删掉
        "http://qiniu-cdn.alexyan.cn/administrator/admin1/avatar/defaultAvatar.jpg",
    });
    let fetchAvatarUrl: () => void = () => console.log("未获取到role信息");

    if (cookies.get("aspirin-role") === "STUDENT") {
      fetchAvatarUrl = () =>
        (data.avatarUrl = store.state.student.info.avatarUrl);
    } else if (cookies.get("aspirin-role") === "TEACHER") {
      fetchAvatarUrl = () =>
        (data.avatarUrl = store.state.teacher.info.avatarUrl);
    }

    autoRetryUtilFetchedUserInfo(fetchAvatarUrl);

    return { ...toRefs(data), logout };
  },
});
</script>

<style scoped lang="scss">
.logout-container {
  margin-top: 8px;
}
.avatar-container {
  display: block;
}
</style>
