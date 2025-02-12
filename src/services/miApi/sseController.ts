// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** join GET /api/sse/join */
export async function joinUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.joinUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.SseEmitter>('/api/sse/join', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
