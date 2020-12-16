<template>
  <div class="card-container">
    <a-modal
      title="修改个人信息"
      v-model:visible="modalVisible"
      @ok="handleModalOk"
    >
      <a-form
        :model="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 16 }"
        :rules="rules"
      >
        <a-form-item label="姓名">
          <a-input :value="userInfo.realName" disabled />
        </a-form-item>
        <a-form-item label="昵称" name="nickname">
          <a-input v-model:value="form.nickname" />
        </a-form-item>
        <a-form-item label="性别">
          <a-radio-group v-model:value="form.gender">
            <a-radio value="SECRETE">
              保密
            </a-radio>
            <a-radio value="MALE">
              男
            </a-radio>
            <a-radio value="FEMALE">
              女
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="  手机号" name="phoneNumber">
          <a-input v-model:value="form.phoneNumber" />
        </a-form-item>
        <a-form-item label="联系方式" name="contactInformation">
          <a-input v-model:value="form.contactInformation" />
        </a-form-item>
      </a-form>
    </a-modal>
    <use-card class="card-left" :loading="cardLeftLoading">
      <div v-if="!cardLeftLoading">
        <a-avatar :size="120" class="avatar">
          <template #icon><img :src="userInfo.avatarUrl" alt=""/></template>
        </a-avatar>
        <h1>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
            userInfo.realName
          }}&nbsp;&nbsp;&nbsp;&nbsp;<FormOutlined
            class="edit-icon"
            @click="handleEditInfo"
          />
        </h1>

        <ul class="text-ul">
          <li>
            <UserOutlined />&nbsp;&nbsp;
            <transition mode="out-in" name="fade-in">
              <!-- 绑定key就可以在信息更新的时候重新渲染tag，然后触发过渡动画 -->
              <span :key="userInfo.nickname"> {{ userInfo.nickname }} </span>
            </transition>
          </li>
          <li>
            <SmileOutlined />&nbsp;&nbsp;
            <transition mode="out-in" name="fade-in">
              <span :key="userInfo.gender"> {{ userInfo.gender }} </span>
            </transition>
          </li>
          <li>
            <EnvironmentOutlined />&nbsp;&nbsp;
            <transition mode="out-in" name="fade-in">
              <span :key="userInfo.faculty"> {{ userInfo.faculty }} </span>
            </transition>
          </li>
          <li>
            <StarOutlined />&nbsp;&nbsp;
            <transition mode="out-in" name="fade-in">
              <span :key="userInfo.specialty"> {{ userInfo.specialty }}</span>
            </transition>
          </li>
          <li>
            <IdcardOutlined />&nbsp;&nbsp;
            <transition mode="out-in" name="fade-in">
              <span :key="userInfo.number">{{ userInfo.number }}</span>
            </transition>
          </li>

          <li>
            <FireOutlined />&nbsp;&nbsp;
            <transition mode="out-in" name="fade-in">
              <span :key="userInfo.admissionYear">{{
                userInfo.admissionYear
              }}</span>
            </transition>
            级
          </li>
          <li>
            <PhoneOutlined />&nbsp;&nbsp;
            <transition mode="out-in" name="fade-in">
              <span :key="userInfo.phoneNumber">{{
                userInfo.phoneNumber
              }}</span>
            </transition>
          </li>
          <li>
            <ContactsOutlined />&nbsp;&nbsp;
            <transition mode="out-in" name="fade-in">
              <span :key="userInfo.contactInformation">{{
                userInfo.contactInformation
              }}</span>
            </transition>
          </li>
        </ul>
      </div>
    </use-card>
    <use-card class="card-right" :loading="cardRightLoading">
      <!-- <h1 style="font-size:30px">功能开发中...</h1> -->
      <h1>功能开发中...</h1>
    </use-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import UseCard from "@/components/basic/UseCard.vue";
import { getRequest, putRequest } from "@/utils/request";
import { store } from "@/store";
import {
  FormOutlined,
  EnvironmentOutlined,
  IdcardOutlined,
  UserOutlined,
  SmileOutlined,
  PhoneOutlined,
  ContactsOutlined,
  FireOutlined,
  StarOutlined
} from "@ant-design/icons-vue";
import { messenger } from "@/utils/my-ant-design-vue";
import { StudentDTO } from "@/api/rest-api";

export default defineComponent({
  components: {
    UseCard,
    FormOutlined,
    EnvironmentOutlined,
    IdcardOutlined,
    UserOutlined,
    SmileOutlined,
    PhoneOutlined,
    ContactsOutlined,
    FireOutlined,
    StarOutlined
  },
  name: "PersonalCenter",
  setup() {
    const data = reactive({
      modalVisible: false,
      handleModalOk: async () => {
        data.modalVisible = false;
        const result = await putRequest("/api/student/information", data.form);
        if (result.code === 0) {
          messenger.success("个人信息修改成功");
          data.fetchInfo();
        } else {
          messenger.error("个人信息修改失败");
        }
      },
      handleEditInfo: () => {
        data.modalVisible = true;
      },
      form: {
        nickname: "",
        gender: "",
        phoneNumber: "",
        contactInformation: ""
      },
      rules: {
        nickname: [
          {
            required: true,
            message: "昵称不能为空",
            trigger: "blur"
          }
        ],
        phoneNumber: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          }
        ],
        contactInformation: [
          {
            required: true,
            message: "其他联系方式不能为空",
            trigger: "blur"
          }
        ]
      },
      cardLeftLoading: true,
      cardRightLoading: true,
      userInfo: {} as StudentDTO,
      fetchInfo: () => {
        getRequest("/api/student/information").then(result => {
          data.userInfo = result.data as StudentDTO;
          data.cardLeftLoading = false;
          Object.assign(data.form, data.userInfo);
          data.form.gender = "SECRETE";
        });
      }
    });

    data.fetchInfo();

    return { ...toRefs(data) };
  }
});
</script>

<style scoped lang="scss">
@import "@/styles/transitions.scss";

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
      margin: {
        top: 35px;
        bottom: 15px;
      }

      & > img {
        transition: all 0.5s;
        &:hover {
          cursor: pointer;
          transform: scale(1.15);
        }
      }
    }

    h1 {
      font-size: 30px;
      display: block;
      border-bottom: 1px solid lightgray;
      width: 64%;
      margin: 0 auto;
      margin-bottom: 10px;
      padding-bottom: 8px;
    }
    .edit-icon {
      font-size: 20px;
      cursor: pointer;
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
