import { MutationTree, GetterTree, ActionTree } from "vuex";
import { getRequest } from "@/utils/request";
import { StudentDTO } from "@/api/rest-api";
import { eventBus } from "@/utils/event-bus";
import { store } from "..";
import { AllState } from "../types";

export const StudentMutations: MutationTree<AllState> = {
  getStudentInfo({ student }) {
    store.commit("setIsInfoFetched", false);
    getRequest("/api/student/information").then(result => {
      student.info = result.data as StudentDTO;
      store.commit("setIsInfoFetched", true);
      eventBus.emit("studentInfoFetched");
    });
  },

  setIsInfoFetched({ student }, status: boolean) {
    student.isInfoFetched = status;
  }
};

export const StudentActions: ActionTree<AllState, AllState> = {};
