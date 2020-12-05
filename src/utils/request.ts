import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import qs from "qs";
import { ExceptionEnum, JsonWrapper } from "@/api/rest-api";
import { message } from "ant-design-vue";
import { messenger } from "./my-ant-design-vue";
// axios重试插件
import * as rax from "retry-axios";

// 直接调用Axios可以处理多个请求, Axios.all([request1, ...]).then(() => Axios.spread(result1, ...) => {})

// 请求超时的时限
const REQUEST_TIMEOUT = 10000;

// create an axios instance
const httpClient = axios.create({
  // npm run serve 默认指向.env.development
  baseURL: process.env.VUE_APP_API_BASE_URL,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: REQUEST_TIMEOUT, // request timeout
  raxConfig: {
    // 重试次数
    retry: 3,
    onRetryAttempt: err => {
      messenger.warning(`请求超时，正在重试`);
    }
  }
});
// 绑定实例 详见: https://github.com/JustinBeckwith/retry-axios/issues/121
httpClient.defaults.raxConfig = {
  ...httpClient.defaults.raxConfig,
  instance: httpClient
};

// 使重试插件生效
const interceptorId = rax.attach(httpClient);

// 处理response异常
function handleError<T>(result: JsonWrapper<T>): void {
  const errorCode: number = result.code;
  const errorMessage: string = result.message;

  switch (errorCode) {
    case ExceptionEnum.NOT_LOGIN:
      // TODO: 正式运行再开启
      // loginRedirect();
      break;

    default:
      // 没有统一处理的errorCode部分
      break;
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
  // HTTP状态码为200时才经过这段代码
  (response: AxiosResponse) => {
    const result = response.data;
    handleError(result);
    return result;
  },

  error => {
    // 异常处理

    /* const { code, message, config } = error;                      */
    /* if (code === "ECONNABORTED" || message === "Network Error") { */
    /*   // 请求超时                                             */
    /*   messenger.error(`请求超时，网络状况不佳`);       */
    /* }                                                             */

    // 可以进行相关提示等处理
    return Promise.reject(error);
  }
);

export function getRequest<T>(
  url: string,
  params?: any
): Promise<JsonWrapper<T>> {
  return httpClient.get(url, { params: params });
}

export function postRequest<T>(
  url: string,
  params?: any
): Promise<JsonWrapper<T>> {
  return httpClient.post(url, qs.stringify(params));
}

export function putRequest<T>(
  url: string,
  params?: any
): Promise<JsonWrapper<T>> {
  return httpClient.put(url, qs.stringify(params));
}

export function deleteRequest<T>(
  url: string,
  params?: any
): Promise<JsonWrapper<T>> {
  return httpClient.delete(url, { params: qs.stringify(params) });
}

export function patchRequest<T>(
  url: string,
  params?: any
): Promise<JsonWrapper<T>> {
  return httpClient.patch(url, qs.stringify(params));
}
