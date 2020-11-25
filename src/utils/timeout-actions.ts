import { messenger } from "./my-ant-design-vue";
import { randomString, setIntervalImmediately } from "./basic-lib";
import { router } from "@/router";

export function loginRedirectMessage() {
  const key: string = randomString();
  let timeout = 3;

  const interval = setIntervalImmediately(() => {
    if (timeout > 0) {
      messenger.info({
        content: `${timeout}秒后回到登录页面`,
        key,
        duration: timeout
      });
      --timeout;
    } else {
      clearInterval(interval);
      // router.push("/login");
    }
  }, 1000);
}
