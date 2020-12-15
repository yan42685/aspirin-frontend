import { RouteRecordRaw } from "vue-router";
import Framework from "@/layout/framework/Framework.vue";

export const teacherRoutes: RouteRecordRaw[] = [
  {
    name: "Teacher",
    path: "/teacher",
    component: Framework,
    meta: {
      title: "教师",
      roles: ["TEACHER"]
    },
    children: [
      {
        name: "TeacherInfo",
        path: "teacher-info",
        component: () => import("@/views/teacher/info/info.vue"),
        meta: {
          title: "个人中心"
        }
      },
      {
        name: "TeacherScore",
        path: "teacher-score",
        component: () => import("@/views/teacher/score/score.vue"),
        meta: {
          title: "评分",
          hidden: true
        }
      },
      {
        name: "TeacherTeach",
        path: "teacher-teach",
        component: () => import("@/views/teacher/teach/teach.vue"),
        meta: {
          title: "授课表"
        }
      }
    ]
  }
];
