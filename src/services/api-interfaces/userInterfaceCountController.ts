// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

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
