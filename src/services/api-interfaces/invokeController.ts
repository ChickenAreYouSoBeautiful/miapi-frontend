// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 在线调用 执行在线调用，返回调用结果 POST /api-interfaces/api/invoke */
export async function invokeUsingPost(
  body: API.InvokeInterfaceRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>('/api-interfaces/api/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 执行在线调用,流式响应 根据任务id获取接口参数，执行在线调用，返回流式调用结果 GET /api-interfaces/api/sse/invoke */
export async function invokeSseUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.invokeSseUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.FluxString_>('/api-interfaces/api/sse/invoke', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 提交在线调用请求参数，流式响应 提交在线调用请求参数，返回任务id POST /api-interfaces/api/sse/submit */
export async function submitSseUsingPost(
  body: API.InvokeInterfaceRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api-interfaces/api/sse/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
