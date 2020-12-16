import { MutationTree, GetterTree, ActionTree } from "vuex";
import { getRequest } from "@/utils/request";
import { TeacherDTO } from "@/api/rest-api";
import { eventBus } from "@/utils/event-bus";
import { store } from "..";
import { AllState } from "../types";

export const TeacherMutations: MutationTree<AllState> = {
  getTeacherInfo({ teacher }) {
    store.commit("setIsInfoFetched", false);
    getRequest("/api/teacher/information").then(result => {
      teacher.info = result.data as TeacherDTO;
      store.commit("setIsInfoFetched", true);
      eventBus.emit("teacherInfoFetched");
    });
  }
};

export const TeacherActions: ActionTree<AllState, AllState> = {};
