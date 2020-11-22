import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { ExceptionEnum, JsonWrapper } from "@/api/rest-api";
import { message } from "ant-design-vue";

// create an axios instance
const httpClient = axios.create({
  // npm run serve 默认指向.env.development
  baseURL: process.env.VUE_APP_API_BASE_URL,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// 处理response异常
function handleError<T>(httpStatus: number, result: JsonWrapper<T>): void {
  if (httpStatus === 404) {
    // TODO: 404界面
  } else {
    const errorCode: number = result.code;
    const errorMessage: string = result.message;
    const messageDuration = 3;

    switch (errorCode) {
      case ExceptionEnum.NOT_LOGIN:
        // TODO: 登录重定向
        message.info(`您尚未登录，${messageDuration}秒后将返回登录界面`);
        break;

      default:
        message.error(errorMessage);
        break;
    }
  }
}

// request interceptor
httpClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },

  error => {
    message.error(error);
    return Promise.reject(error);
  }
);

// response interceptor
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },

  error => {
    if (error) {
      handleError(error.status, error.data);
    } else {
      message.error("请求超时，当前网络状况不佳");
    }
    return Promise.reject(error);
  }
);

export { httpClient };
