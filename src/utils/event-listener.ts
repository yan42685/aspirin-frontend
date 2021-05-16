import { onMounted } from "@vue/runtime-core";

export function stopSpaceDefaultBehavior() {
    onMounted(() => {
        document.addEventListener("keydown", (event) => {
            if (event && event.keyCode == 32) {
                event.preventDefault();
            }
        });
    });
}
