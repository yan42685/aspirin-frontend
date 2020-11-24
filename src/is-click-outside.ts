import { ref, Ref, onMounted, onUnmounted } from "vue";

export function isClickOutside(elementRef: Ref<null | HTMLElement>) {
  const isClickOutside = ref(false);

  const handler = (event: MouseEvent) => {
    if (elementRef.value) {
      // TODO: 视频里写的是HTMLElement而不是Node, 不知道有没有区别
      if (elementRef.value.contains(event.target as Node)) {
        isClickOutside.value = true;
      } else {
        isClickOutside.value = false;
      }
    }

    onMounted(() => {
      document.addEventListener("click", handler);
    });
    onUnmounted(() => {
      document.removeEventListener("click", handler);
    });
    return isClickOutside;
  };
}
