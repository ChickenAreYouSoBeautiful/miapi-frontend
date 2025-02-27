import '@umijs/max';

import {requestConfig} from '@/requestConfig';
import {
  getInterfaceInfoVoByIdUsingGet,
  invokeStreamUsingPost,
  invokeUsingPost,
} from '@/services/miApi/interfaceInfoController';
import {getLoginUserUsingGet} from '@/services/miApi/userController';
import {Button, Card, Descriptions, Divider, Empty, Flex, Form, Input, List, message, Space,} from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';

const InterFaceInfo: React.FC = () => {
  const param = useParams();
  const [interfaceInfo, setInterface] = useState<API.InterfaceInfoVO>({});
  const [loadingInterface, setLoadingInterface] = useState<boolean>(false);
  const [loadingInvoke, setloadingInvoke] = useState<boolean>(false);
  const [invokeData, setInvokeData] = useState<string>();
  const [invokeDataResponse, setInvokeDataResponse] = useState<any>({});
  const [requestParamJson, setRequestParamJson] = useState<API.RequestJson[]>();
  const [sseMessages, setSseMessages] = useState<string[]>([]);

  const loadData = async () => {
    setLoadingInterface(true);
    if (!param.id) {
      message.error('接口信息异常');
      return;
    }
    try {
      const res = (await getInterfaceInfoVoByIdUsingGet({id: Number(param.id)})) as any;
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
    } catch (e) {
      message.error(e.message);
    }
    setLoadingInterface(false);
  };

  const finishInterface = async (values: { params: any }) => {
    setloadingInvoke(true);
    if (!interfaceInfo.id) {
      message.error('接口信息异常');
      return false;
    }
    //判断是否是sse请求
    if (interfaceInfo.requestHeader?.includes('text/event-stream')) {
      try {
        const user = await getLoginUserUsingGet();

        const sseUrl = `${requestConfig.baseURL}/api/sse?userId=${user?.data?.id}`;
        setSseMessages([]);
        // 创建 EventSource 对象
        const eventSource = new EventSource(sseUrl);

        // 监听消息
        eventSource.onmessage = (event) => {
          console.log(event.data);
          setSseMessages((prevMessages) => [...prevMessages, event.data]);
        };

        // 监听错误
        eventSource.onerror = (e) => {
          message.error('SSE连接错误' + e);
          eventSource.close();
          setloadingInvoke(false);
        };

        invokeStreamUsingPost({
          id: interfaceInfo.id,
          interfaceParam: values.params,
        });
        setloadingInvoke(false);

        return;
      } catch (e) {
        message.error(e.message);
        setloadingInvoke(false);
        return;
      }
    }

    try {
      const res = await invokeUsingPost({
        id: interfaceInfo.id,
        interfaceParam: interfaceInfo.method === 'POST' ? values.params : JSON.stringify(values),
      });
      console.log(res);
      setInvokeData(res?.data);
      setInvokeDataResponse(res);
    } catch (e) {
      message.error(e.message);
    }

    setloadingInvoke(false);
  };
  useEffect(() => {
    loadData();
  }, []);
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
          <Descriptions.Item label="请求参数">{interfaceInfo?.requestParam}</Descriptions.Item>
          <Descriptions.Item label="请求示例">
            {interfaceInfo?.sampleRequestParam}
          </Descriptions.Item>
          <Descriptions.Item label="请求头">{interfaceInfo?.requestHeader}</Descriptions.Item>
          <Descriptions.Item label="响应头">{interfaceInfo?.responseHeader}</Descriptions.Item>
          <Descriptions.Item label="更新时间">{interfaceInfo?.updateTime}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Divider/>
      <Card title={'在线调试'}>
        <>
          <Form
            name="invokeInterfaceForm"
            labelCol={{span: 3}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 800}}
            initialValues={{remember: true}}
            onFinish={finishInterface}
            autoComplete="off"
            layout={'horizontal'}
            labelAlign="left"
          >
            {interfaceInfo?.method === 'POST' ? (<Form.Item
                label="请求参数"
                name="params"
                rules={[{required: true, message: '该参数不能为空!'}]}
              >
                <Input.TextArea autoSize={{minRows: 2, maxRows: 10}} style={{width: '100%'}}/>
              </Form.Item>
            ) : (
              requestParamJson &&
              <List
                dataSource={requestParamJson}
                size={'default'}
                renderItem={(item) => (
                  <List.Item>
                    <Form.Item colon={true} label={item.name} name={item.name}>
                      <Space>
                        <Input
                          style={{width: '50vw'}}
                          placeholder={'请输入' + item.name + ',类型为' + item.type}
                        />
                      </Space>
                    </Form.Item>
                  </List.Item>
                )}
              />
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                在线调试
              </Button>
            </Form.Item>
          </Form>
        </>

      </Card>
      <Divider/>
      <Card title={'调用详情:'} loading={loadingInvoke}>
        <Flex gap={'large'}>
          <Card title={'调用结果'} style={{width: '50%'}}>
            {interfaceInfo.requestHeader?.includes('text/event-stream') ? (
              <div>
                <Paragraph
                  copyable={sseMessages.length > 0}
                  ellipsis={{
                    rows: 2,
                    expandable: true,
                    symbol: (expanded) => {
                      return expanded ? '收起' : '展开';
                    },
                  }}
                >
                  <text style={{whiteSpace: 'pre-line'}}>{sseMessages}</text>
                </Paragraph>
              </div>
            ) : invokeData ? (
              <text style={{whiteSpace: 'pre-line'}}>{invokeData}</text>
            ) : (
              <Empty/>
            )}
          </Card>
          <Card title={'响应JSON'} style={{width: '50%'}}>
            {invokeDataResponse?.data ? (
              JSON.stringify(invokeDataResponse)
            ) : (
              <Empty
                description={
                  <span>
                    <text style={{color: 'red'}}>
                      {JSON.stringify(invokeDataResponse?.message)}
                    </text>
                  </span>
                }
              />
            )}
          </Card>
        </Flex>
      </Card>
    </div>
  );
};
export default InterFaceInfo;
