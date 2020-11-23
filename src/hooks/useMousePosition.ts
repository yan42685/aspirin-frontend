import { reactive, toRefs, onMounted, onUnmounted } from "vue";

function useMousePosition() {
  const position = reactive({
    x: 0,
    y: 0
  });

  const updatePosition = (e: MouseEvent) => {
    position.x = e.pageX;
    position.y = e.pageY;
  };

  onMounted(() => document.addEventListener("click", updatePosition));
  onUnmounted(() => document.removeEventListener("click", updatePosition));
  return { ...toRefs(position) };
}

export { useMousePosition };
