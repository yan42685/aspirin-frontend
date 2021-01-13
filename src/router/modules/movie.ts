import { RouteRecordRaw } from "vue-router";
import Framework from "@/layout/framework/Framework.vue";

export const movieRoutes: RouteRecordRaw[] = [
  {
    name: "Movie",
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
      },
      {name: "MovieList",
      path:"list",
      component: () => import("@/views/movie/MovieList.vue"),
      meta: {
        title: "电影列表"
      }
      }
    ]
  }
];
