import { createStore } from "vuex";
import { tabBarMutations } from "./modules/tab-bar";
import { GenderEnum, RoleEnum } from "@/api/rest-api";
import { AllState } from "./types";
import { StudentMutations, StudentActions } from "./modules/student";

export const store = createStore<AllState>({
  state: {
    user: { role: null },
    student: {
      info: {
        username: "",
        realName: "",
        gender: GenderEnum.SECRETE,
        phoneNumber: "",
        contactInformation: "",
        nickname: "",
        avatarUrl: "",
        faculty: "",
        specialty: "",
        number: "",
        admissionYear: 0,
        semester: 0
      },
      isInfoFetched: false
    },
    tabBar: { openTabs: [] },
    layout: { sidebarCollapsed: false }
  },

  getters: {},

  mutations: {
    // ==========================
    //  路由
    // ==========================
    toggleSidebarCollapse({ layout }) {
      layout.sidebarCollapsed = !layout.sidebarCollapsed;
    },
    // ==========================
    //  用户
    // ==========================
    setUserRole({ user }, role: RoleEnum) {
      user.role = role;
    },

    // ==========================
    //  标签页
    // ==========================
    ...tabBarMutations,

    // 学生
    ...StudentMutations
  },

  actions: {
    ...StudentActions
  }
});
