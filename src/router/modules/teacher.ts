import { RouteRecordRaw } from "vue-router";
import Framework from "@/layout/framework/Framework.vue";

export const teacherRoutes: RouteRecordRaw[] = [
  {
    name: "teacher",
    path: "/teacher",
    component: Framework,
    meta: {
      title: "教师",
      roles: ["teacher"]
    },
    children: []
  }
];
