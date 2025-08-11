import '@umijs/max';

import ResponseViewer from '@/components/InterfaceInfo/ResponseViewer';
import { requestConfig } from '@/requestConfig';
import { getInterfaceInfoVoByIdUsingGet } from '@/services/api-interfaces/interfaceInfoController';
import { invokeUsingPost, submitSseUsingPost } from '@/services/api-interfaces/invokeController';
import { Button, Card, Descriptions, Divider, Flex, Form, Input, List, message, Space, Typography, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const { Title, Text, Paragraph } = Typography;

const InterFaceInfo: React.FC = () => {
  const param = useParams();
  const [form] = Form.useForm(); // 添加表单实例
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
      var data = JSON.parse(event.data);
      if (data.v === '[END]') {
        setSseEnded(true);
        eventSource.close();
        setloadingInvoke(false);
        return;
      }
      // 直接使用原始数据
      setSseMessages((prev) => [...prev, data.v]);
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

  // 添加重置表单函数
  const handleResetForm = () => {
    form.resetFields();
    message.success('参数已重置');
  };

  useEffect(() => {
    loadData();
  }, []);

  const JsonPretty = ({ data }: { data?: string }) => {
    if (!data) return <Text type="secondary">无</Text>;
    try {
      return (
        <Paragraph
          copyable={{
            text: JSON.stringify(JSON.parse(data), null, 2),
            tooltips: ['复制', '复制成功'],
          }}
          style={{
            background: '#fafafa',
            padding: 12,
            borderRadius: 6,
            maxHeight: 300,
            overflow: 'auto',
            border: '1px solid #f0f0f0',
            margin: 0,
          }}
        >
          <pre style={{ margin: 0, fontSize: '12px', lineHeight: '1.5' }}>
            {JSON.stringify(JSON.parse(data), null, 2)}
          </pre>
        </Paragraph>
      );
    } catch {
      return <Text type="danger">非合法JSON</Text>;
    }
  };

  const getStatusTag = (status?: number) => {
    return status !== 0 ? (
      <Tag color="orange">待开放</Tag>
    ) : (
      <Tag color="green">开放</Tag>
    );
  };

  const getMethodTag = (method?: string) => {
    const methodColors: Record<string, string> = {
      GET: 'blue',
      POST: 'green',
      PUT: 'orange',
      DELETE: 'red',
      PATCH: 'purple',
    };
    return <Tag color={methodColors[method || ''] || 'default'}>{method}</Tag>;
  };

  return (
    <div>
      <Card loading={loadingInterface}>
        <div style={{ marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 8 }}>
            {interfaceInfo?.name || '接口信息'}
          </Title>
          {interfaceInfo?.description && (
            <Paragraph type="secondary" style={{ fontSize: '16px', marginBottom: 16 }}>
              {interfaceInfo.description}
            </Paragraph>
          )}
          <Space size="large" style={{ marginBottom: 16 }}>
            <Space>
              <Text strong>状态：</Text>
              {getStatusTag(interfaceInfo?.status)}
            </Space>
            <Space>
              <Text strong>请求方式：</Text>
              {getMethodTag(interfaceInfo?.method)}
            </Space>
            <Space>
              <Text strong>更新时间：</Text>
              <Text>{interfaceInfo?.updateTime}</Text>
            </Space>
          </Space>
        </div>

        <div style={{ marginBottom: 24 }}>
          <Title level={4} style={{ marginBottom: 16 }}>
            接口地址
          </Title>
          <Paragraph
            copyable={{
              text: interfaceInfo?.url || '',
              tooltips: ['复制地址', '复制成功'],
            }}
            style={{
              background: '#f6f8fa',
              padding: 12,
              borderRadius: 6,
              border: '1px solid #e1e4e8',
              margin: 0,
              fontFamily: 'monospace',
            }}
          >
            {interfaceInfo?.url || '暂无地址'}
          </Paragraph>
        </div>

        <div style={{ marginBottom: 24 }}>
          <Title level={4} style={{ marginBottom: 16 }}>
            请求参数
          </Title>
          <JsonPretty data={interfaceInfo?.requestParam} />
        </div>

        <div style={{ marginBottom: 24 }}>
          <Title level={4} style={{ marginBottom: 16 }}>
            请求示例
          </Title>
          <JsonPretty data={interfaceInfo?.sampleRequestParam} />
        </div>

        <div style={{ marginBottom: 24 }}>
          <Title level={4} style={{ marginBottom: 16 }}>
            请求头
          </Title>
          <JsonPretty data={interfaceInfo?.requestHeader} />
        </div>

        <div style={{ marginBottom: 24 }}>
          <Title level={4} style={{ marginBottom: 16 }}>
            响应头
          </Title>
          <JsonPretty data={interfaceInfo?.responseHeader} />
        </div>
      </Card>

      <Divider />

      <Card
        title={
          <Space>
            <Title level={3} style={{ margin: 0 }}>
              在线调试与结果
            </Title>
            <Tag color="blue">实时调试</Tag>
          </Space>
        }
        loading={loadingInvoke}
        style={{ marginTop: 16 }}
        bodyStyle={{ padding: '24px' }}
      >
        <Flex gap="large" align="flex-start">
          {/* 左侧：在线调用表单 */}
          <div style={{ width: '50%' }}>
            <Card
              title={
                <Space>
                  <Title level={4} style={{ margin: 0 }}>
                    参数配置
                  </Title>
                  <Tag color="green">{requestParamJson?.length || 0} 个参数</Tag>
                </Space>
              }
              size="small"
              style={{ height: 'fit-content' }}
            >
              {requestParamJson && requestParamJson.length > 0 ? (
                <Form
                  form={form} // 绑定表单实例
                  name="invokeInterfaceForm"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 18 }}
                  style={{ maxWidth: '100%' }}
                  initialValues={{ remember: true }}
                  onFinish={finishInterface}
                  autoComplete="off"
                  layout="horizontal"
                  labelAlign="left"
                >
                  <List
                    dataSource={requestParamJson}
                    size="small"
                    split={false}
                    style={{ marginBottom: 16 }}
                    renderItem={(item, index) => (
                      <List.Item style={{ padding: '8px 0', border: 'none' }}>
                        <Form.Item
                          colon={true}
                          label={
                            <Space>
                              <Text strong>{item.name}</Text>
                              <Tag color="orange">{item.type}</Tag>
                            </Space>
                          }
                          name={item.name}
                          style={{ marginBottom: 8, width: '100%' }}
                        >
                          <Input
                            placeholder={`请输入 ${item.name}，类型为 ${item.type}`}
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </List.Item>
                    )}
                  />

                  <Form.Item style={{ marginBottom: 0, textAlign: 'center' }}>
                    <Space>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loadingInvoke}
                        icon={<span>🚀</span>}
                      >
                        开始调试
                      </Button>
                      <Button
                        onClick={handleResetForm}
                        icon={<span>🔄</span>}
                      >
                        重置参数
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Text type="secondary">该接口无需参数配置</Text>
                </div>
              )}
            </Card>
          </div>

          {/* 右侧：调用结果 */}
          <div style={{ width: '50%' }}>
            <Card
              title={
                <Space>
                  <Title level={4} style={{ margin: 0 }}>
                    调用结果
                  </Title>
                  {interfaceInfo.responseHeader?.includes('text/event-stream') && (
                    <Tag color="purple">SSE 流式响应</Tag>
                  )}
                  {invokeData && (
                    <Tag color="success">调试完成</Tag>
                  )}
                </Space>
              }
              size="small"
              style={{ height: 'fit-content' }}
              extra={
                invokeData && (
                  <Button
                    size="small"
                    type="text"
                    onClick={() => {
                      navigator.clipboard.writeText(invokeData);
                      message.success('结果已复制到剪贴板');
                    }}
                  >
                    复制结果
                  </Button>
                )
              }
            >
              <div style={{ minHeight: '200px' }}>
                {invokeData || sseMessages.length > 0 ? (
                  <ResponseViewer
                    type={interfaceInfo.responseHeader || 'application/json'}
                    data={
                      interfaceInfo.responseHeader?.includes('text/event-stream')
                        ? sseMessages.join('')  // 直接连接，不进行额外处理
                        : invokeData
                    }
                  />
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#999',
                    fontSize: '14px'
                  }}>
                    <div style={{ marginBottom: 8 }}>📊</div>
                    <Text type="secondary">点击"开始调试"按钮查看调用结果</Text>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </Flex>

        {/* 调试状态提示 */}
        {loadingInvoke && (
          <div style={{
            marginTop: 16,
            padding: '12px 16px',
            background: '#f6ffed',
            border: '1px solid #b7eb8f',
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <Space>
              <span>⏳</span>
              <Text type="success">正在调用接口，请稍候...</Text>
            </Space>
          </div>
        )}

        {/* 调试完成提示 */}
        {!loadingInvoke && invokeData && (
          <div style={{
            marginTop: 16,
            padding: '12px 16px',
            background: '#f0f9ff',
            border: '1px solid #91d5ff',
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <Space>
              <span>✅</span>
              <Text type="success">接口调用成功！</Text>
            </Space>
          </div>
        )}
      </Card>
    </div>
  );
};

export default InterFaceInfo;
