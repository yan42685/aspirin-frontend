import { httpClient } from "@/config/axios-config";
import { JsonWrapper } from "@/api/rest-api";
import qs from "qs";

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
