// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** invoke POST /api-interfaces/api/invoke */
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

/** invokeSse POST /api-interfaces/api/sse/invoke */
export async function invokeSseUsingPost(
  body: API.InvokeInterfaceRequest,
  options?: { [key: string]: any },
) {
  return request<API.FluxString_>('/api-interfaces/api/sse/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
