// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addUserInterfaceCount POST /api-interfaces/userInterfaceCount/add */
export async function addUserInterfaceCountUsingPost(
  body: API.UserInterfaceCountAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api-interfaces/userInterfaceCount/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** analyse GET /api-interfaces/userInterfaceCount/analyse */
export async function analyseUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.analyseUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserInterfaceCountAnalyseVo_>(
    '/api-interfaces/userInterfaceCount/analyse',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** deleteUserInterfaceCount POST /api-interfaces/userInterfaceCount/delete */
export async function deleteUserInterfaceCountUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api-interfaces/userInterfaceCount/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserInterfaceCountVOById GET /api-interfaces/userInterfaceCount/get/vo */
export async function getUserInterfaceCountVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserInterfaceCountVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserInterfaceCountVO_>(
    '/api-interfaces/userInterfaceCount/get/vo',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** listUserInterfaceCountVOByPage POST /api-interfaces/userInterfaceCount/list/page/vo */
export async function listUserInterfaceCountVoByPageUsingPost(
  body: API.UserInterfaceCountQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserInterfaceCountVO_>(
    '/api-interfaces/userInterfaceCount/list/page/vo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** listMyUserInterfaceCountVOByPage POST /api-interfaces/userInterfaceCount/my/list/page/vo */
export async function listMyUserInterfaceCountVoByPageUsingPost(
  body: API.UserInterfaceCountQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserInterfaceCountVO_>(
    '/api-interfaces/userInterfaceCount/my/list/page/vo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** updateUserInterfaceCount POST /api-interfaces/userInterfaceCount/update */
export async function updateUserInterfaceCountUsingPost(
  body: API.UserInterfaceCountUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api-interfaces/userInterfaceCount/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
