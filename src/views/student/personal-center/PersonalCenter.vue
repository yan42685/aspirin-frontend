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
        class="form"
      >
        <a-form-item label="姓名">
          <a-input :value="userInfo.realName" disabled />
        </a-form-item>
        <a-form-item label="昵称">
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
        <a-form-item label="  手机号">
          <a-input v-model:value="form.phoneNumber" />
        </a-form-item>
        <a-form-item label="联系方式">
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
          <li>{{ userInfo.nickname }}</li>
          <li>{{ userInfo.gender }}</li>
          <li>{{ userInfo.faculty }}</li>
          <li>{{ userInfo.specialty }}</li>
          <li>{{ userInfo.number }}</li>
          <li>{{ userInfo.admissionYear }}级</li>
          <li>{{ userInfo.phoneNumber }}</li>
          <li>{{ userInfo.contactInformation }}</li>
        </ul>
      </div>
    </use-card>
    <use-card class="card-right" :loading="cardRightLoading">
      <h1 style="font-size:30px">功能开发中...</h1>
    </use-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import UseCard from "@/components/basic/UseCard.vue";
import { getRequest, putRequest } from "@/utils/request";
import { store } from "@/store";
import { FormOutlined } from "@ant-design/icons-vue";
import { messenger } from "@/utils/my-ant-design-vue";
import { StudentDTO } from "@/api/rest-api";

export default defineComponent({
  components: { UseCard, FormOutlined },
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
        nickName: "",
        gender: "",
        phoneNumber: "",
        contactInformation: ""
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
    }
    .edit-icon {
      font-size: 20px;
      cursor: pointer;
    }

    ul {
      border-top: 1px solid lightgray;
      /* padding-top: 35px; */
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
