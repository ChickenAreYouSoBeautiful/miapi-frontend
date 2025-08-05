import '@umijs/max';

import ResponseViewer from '@/components/InterfaceInfo/ResponseViewer';
import { requestConfig } from '@/requestConfig';
import { getInterfaceInfoVoByIdUsingGet } from '@/services/api-interfaces/interfaceInfoController';
import { invokeUsingPost, submitSseUsingPost } from '@/services/api-interfaces/invokeController';
import { Button, Card, Descriptions, Divider, Flex, Form, Input, List, message, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const InterFaceInfo: React.FC = () => {
  const param = useParams();
  const [interfaceInfo, setInterface] = useState<API.InterfaceInfoVO>({});
  const [loadingInterface, setLoadingInterface] = useState<boolean>(false);
  const [loadingInvoke, setloadingInvoke] = useState<boolean>(false);
  const [invokeData, setInvokeData] = useState<string>();
  const [requestParamJson, setRequestParamJson] = useState<API.RequestJson[]>();
  const [sseMessages, setSseMessages] = useState<string[]>([]);
  const [sseEnded, setSseEnded] = useState(false);

  const loadData = async () => {
    setLoadingInterface(true);
    if (!param.id) {
      message.error('接口信息异常');
      return;
    }
    try {
      const res = (await getInterfaceInfoVoByIdUsingGet({ id: Number(param.id) })) as any;
      if (res.code === 0) {
        setInterface(res.data);

        if (res.data?.requestParam) {
          const requestParam = JSON.parse(res.data?.requestParam);
          if (Object.keys(requestParam).length === 0) {
            setRequestParamJson(undefined);
          } else {
            setRequestParamJson(requestParam);
          }
        }
      }
    } catch (e: any) {
      message.error(e.message);
    }
    setLoadingInterface(false);
  };

  const getInvokeType = () => {
    const header = interfaceInfo.responseHeader || '';
    // if (header.includes('websocket')) return 'websocket';
    if (header.includes('text/event-stream')) return 'sse';
    return 'normal';
  };

  const handleNormalInvoke = async (params: any) => {
    const res = await invokeUsingPost({
      id: interfaceInfo.id,
      interfaceParam: JSON.stringify(params),
    });
    setInvokeData(res?.data as unknown as string);
  };

  const handleSseInvoke = async (params: any) => {
    // 1. 提交参数，获取 taskId
    const submitRes = await submitSseUsingPost({
      id: interfaceInfo.id,
      interfaceParam: JSON.stringify(params),
    });
    if (submitRes.code !== 0 || !submitRes.data) {
      throw new Error('任务提交失败');
    }
    const taskId = submitRes.data;
    setSseMessages([]);
    // 2. 用 EventSource 拉流
    const sseUrl = `${
      requestConfig.baseURL
    }/api-interfaces/api/sse/invoke?taskId=${encodeURIComponent(taskId)}`;
    const eventSource = new EventSource(sseUrl, {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      if (event.data === '[END]') {
        setSseEnded(true);
        eventSource.close();
        setloadingInvoke(false);
        return;
      }
      setSseMessages((prev) => [...prev, event.data]);
    };
    eventSource.onerror = () => {
      // 如果已经收到结束标记，则不提示错误
      if (!sseEnded) {
        message.error('SSE连接错误');
      }
      eventSource.close();
      setloadingInvoke(false);
    };
    eventSource.onopen = () => {
      setloadingInvoke(false);
    };
  };

  // const handleWebSocketInvoke = async (params: any) => {
  //   setSseMessages([]);
  //   // 这里需要你根据实际后端 ws 地址填写
  //   const wsUrl = `ws://你的ws服务地址`;
  //   const ws = new WebSocket(wsUrl);

  //   ws.onopen = () => {
  //     ws.send(JSON.stringify({
  //       id: interfaceInfo.id,
  //       interfaceParam: params,
  //     }));
  //     setloadingInvoke(false);
  //   };
  //   ws.onmessage = (event) => {
  //     setSseMessages((prev) => [...prev, event.data]);
  //   };
  //   ws.onerror = (e) => {
  //     message.error('WebSocket连接错误');
  //     ws.close();
  //     setloadingInvoke(false);
  //   };
  //   ws.onclose = () => {};
  // };

  const finishInterface = async (values: string) => {
    setloadingInvoke(true);
    if (!interfaceInfo.id) {
      message.error('接口信息异常');
      setloadingInvoke(false);
      return false;
    }
    try {
      const type = getInvokeType();
      if (type === 'sse') {
        await handleSseInvoke(values);
      } else {
        await handleNormalInvoke(values);
      }
    } catch (e: any) {
      message.error(e.message || '请求失败');
    }
    setloadingInvoke(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const JsonPretty = ({ data }: { data?: string }) => {
    if (!data) return <span style={{ color: '#aaa' }}>无</span>;
    try {
      return (
        <pre
          style={{
            background: '#f6f6f6',
            padding: 12,
            borderRadius: 4,
            maxHeight: 300,
            overflow: 'auto',
          }}
        >
          {JSON.stringify(JSON.parse(data), null, 2)}
        </pre>
      );
    } catch {
      return <span style={{ color: 'red' }}>非合法JSON</span>;
    }
  };

  return (
    //   createTime?: string;
    //     description?: string;
    //     id?: number;
    //     method?: string;
    //     name?: string;
    //     requestHeader?: string;
    //     responseHeader?: string;
    //     status?: number;
    //     updateTime?: string;
    //     url?: string;
    //     userid?: number;
    <div>
      <Card loading={loadingInterface} title={'接口信息'}>
        <Descriptions>
          <Descriptions.Item label="接口名称">{interfaceInfo?.name} </Descriptions.Item>
          <Descriptions.Item label="接口描述">{interfaceInfo?.description}</Descriptions.Item>
          <Descriptions.Item label="接口状态">
            {interfaceInfo?.status !== 0 ? '待开放' : '开放'}
          </Descriptions.Item>
          <Descriptions.Item label="接口地址">{interfaceInfo?.url}</Descriptions.Item>
          <Descriptions.Item label="请求方式">{interfaceInfo?.method}</Descriptions.Item>
          <Descriptions.Item label="请求参数">
            <JsonPretty data={interfaceInfo?.requestParam} />
          </Descriptions.Item>
          <Descriptions.Item label="请求示例">
            <JsonPretty data={interfaceInfo?.sampleRequestParam} />
          </Descriptions.Item>
          <Descriptions.Item label="请求头">
            <JsonPretty data={interfaceInfo?.requestHeader} />
          </Descriptions.Item>
          <Descriptions.Item label="响应头">
            <JsonPretty data={interfaceInfo?.responseHeader} />
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">{interfaceInfo?.updateTime}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Divider />
      <Card title="在线调试与结果" loading={loadingInvoke} style={{ marginTop: 16 }}>
        <Flex gap="large" align="flex-start">
          {/* 左侧：在线调用表单 */}
          <div style={{ width: '50%' }}>
            <Form
              name="invokeInterfaceForm"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
              style={{ maxWidth: 400 }}
              initialValues={{ remember: true }}
              onFinish={finishInterface}
              autoComplete="off"
              layout="horizontal"
              labelAlign="left"
            >
              {/* {interfaceInfo?.method === 'POST' ? (
                <Form.Item
                  label="请求参数"
                  name="params"
                  rules={[{ required: true, message: '该参数不能为空!' }]}
                >
                  <Input.TextArea autoSize={{ minRows: 2, maxRows: 10 }} style={{ width: '100%' }} />
                </Form.Item>
              ) : ( */}
              {/* requestParamJson && */}
              <List
                dataSource={requestParamJson}
                size="default"
                renderItem={(item) => (
                  <List.Item>
                    <Form.Item colon={true} label={item.name} name={item.name}>
                      <Space>
                        <Input
                          style={{ width: '20vw' }}
                          placeholder={'请输入' + item.name + ',类型为' + item.type}
                        />
                      </Space>
                    </Form.Item>
                  </List.Item>
                )}
              />
              {/* )} */}

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  在线调试
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* 右侧：调用结果 */}
          <div style={{ width: '50%' }}>
            <Card bordered={false}>
              <ResponseViewer
                type={interfaceInfo.responseHeader || 'application/json'}
                data={
                  interfaceInfo.responseHeader?.includes('text/event-stream')
                    ? sseMessages
                    : invokeData
                }
              />
            </Card>
          </div>
        </Flex>
      </Card>
    </div>
  );
};
export default InterFaceInfo;
