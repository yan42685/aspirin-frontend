import { onMounted } from "@vue/runtime-core";

// 禁用浏览器默认的按空格下移网页的行为
export function stopSpaceDefaultBehavior() {
    onMounted(() => {
        document.addEventListener("keydown", (event) => {
            if (event && event.keyCode == 32) {
                event.preventDefault();
            }
        });
    });
}
