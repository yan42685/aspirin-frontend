import { RouteRecordRaw } from "vue-router";
import Framework from "@/layout/framework/Framework.vue";

export const movieRoutes: RouteRecordRaw[] = [
  {
    name: "Teacher",
    path: "/movie",
    component: Framework,
    meta: {
      title: "电影"
    },
    children: [
      {
        name: "MovieHall",
        path: "hall",
        component: () => import("@/views/movie/MovieHall.vue"),
        meta: {
          title: "影厅"
        }
      }
    ]
  }
];
