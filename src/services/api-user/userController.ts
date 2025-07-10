// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listUserVOByPage POST /api-user/user/list/page/vo */
export async function listUserVoByPageUsingPost(
  body: API.UserQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserVO_>('/api-user/user/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** refreshSecreteKey POST /api-user/user/refresh/secreteKey */
export async function refreshSecreteKeyUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api-user/user/refresh/secreteKey', {
    method: 'POST',
    ...(options || {}),
  });
}

/** signIn POST /api-user/user/signIn */
export async function signInUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/api-user/user/signIn', {
    method: 'POST',
    ...(options || {}),
  });
}

/** updateMyUser POST /api-user/user/update/my */
export async function updateMyUserUsingPost(
  body: API.UserUpdateMyRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api-user/user/update/my', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
