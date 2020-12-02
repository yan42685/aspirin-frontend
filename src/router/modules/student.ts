import { RouteRecordRaw } from "vue-router";
import Framework from "../layout/framework/Framework.vue";

export const studentRoutes: RouteRecordRaw[] = [
  {
    name: "Student",
    path: "/student",
    component: Framework,
    meta: {
      title: "学生"
    },
    children: []
  }
];
