import { RouteRecordRaw } from "vue-router";
import Framework from "@/layout/framework/Framework.vue";

export const studentRoutes: RouteRecordRaw[] = [
  {
    name: "Student",
    path: "/student",
    component: Framework,
    meta: {
      title: "学生"
    },
    children: [
      {
        name: "PersonalCenter",
        path: "personal-center",
        component: () =>
          import("@/views/student/personal-center/PersonalCenter.vue"),
        meta: {
          title: "个人中心"
        }
      },
      {
        name: "ElectCourse",
        path: "elect-course",
        component: () => import("@/views/student/elect-course/ElectCourse.vue"),
        meta: {
          title: "选课"
        }
      },
      {
        name: "grade",
        path: "grade",
        component: () => import("@/views/student/grade/UseGrade.vue"),
        meta: {
          title: "成绩单"
        }
      }
    ]
  }
];
