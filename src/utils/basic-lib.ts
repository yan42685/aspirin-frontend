import { ref, Ref, onMounted, onUnmounted } from "vue";

// 获取随机字符串
export function randomString(length = 20) {
  const charset =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i)
    result += charset[Math.floor(Math.random() * charset.length)];
  return result;
}

// setInterval之后立即执行一次
export function setIntervalImmediately(func: Function, interval: number) {
  func();
  return setInterval(func, interval);
}

// 平整状态
export function array2Object<T extends { id: string }>(
  array: Array<T>
): { [key: string]: T } {
  return array.reduce((prev, cur) => {
    if (cur.id) {
      prev[cur.id] = cur;
    }
    return prev;
  }, {} as { [key: string]: T });
}

export function object2Array<T>(obj: { [key: string]: T }): Array<T> {
  return Object.keys(obj).map(key => obj[key]);
}

export function isClickOutside(elementRef: Ref<null | HTMLElement>) {
  const isClickOutside = ref(false);

  const handler = (event: MouseEvent) => {
    // TODO: 视频里写的是HTMLElement而不是Node, 不知道有没有区别
    if (elementRef.value && elementRef.value.contains(event.target as Node)) {
      isClickOutside.value = true;
    } else {
      isClickOutside.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener("click", handler);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });
  return isClickOutside;
}

export function concatPath(base: string, current: string) {
  let result = "";
  if (current === "/") {
    result = "/";
  } else if (base === "" || base === "/") {
    result = "/" + current;
  } else {
    result = base + "/" + current;
  }
  // HACK:
  if (result.startsWith("//")) {
    result = result.slice(1);
  }

  return result;
}
