import { store } from "@/store";
import { router } from "@/router";
import { computed } from "vue";

const openTabs = computed(() => store.state.tabBar.openTabs);

export function getTabByPath(path: string) {
  return openTabs.value.find(tab => tab.path === path);
}

export function activateLastTab() {
  const lastTab = openTabs.value.slice(-1)[0];
  if (lastTab) {
    router.push(lastTab);
  } else {
    router.push("/");
  }
}
