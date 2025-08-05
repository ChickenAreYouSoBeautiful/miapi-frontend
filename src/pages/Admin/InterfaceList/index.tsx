import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { PageContainer, ProDescriptions, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';

import AddInterfaceForm from '@/pages/Admin/InterfaceList/components/AddInterfaceForm';
import {
  addInterfaceInfoUsingPost,
  deleteInterfaceInfoUsingPost,
  listInterfaceInfoVoByPageUsingPost,
  offlineUsingPost,
  onlineUsingPost,
  updateInterfaceInfoUsingPost,
} from '@/services/api-interfaces/interfaceInfoController';
import UpdateForm from './components/UpdateForm';

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [addModalVisible, handleAddModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfoAddRequest>();
  const [currentId, setCurrentId] = useState<number>();
  const onLineInterface = async (values: API.IdRequest) => {
    try {
      const res = await onlineUsingPost(values);
      if (res.code === 0) {
        message.success('操作成功');
        actionRef.current?.reload();
      } else {
        message.error(res?.message);
        return false;
      }
    } catch (e: any) {
      message.error('修改状态错误:' + e.message);
      return false;
    }
  };

  const offLineInterface = async (values: API.IdRequest) => {
    try {
      const res = await offlineUsingPost(values);
      if (res.code === 0) {
        message.success('操作成功');
        actionRef.current?.reload();
      } else {
        message.error(res.message);
        return false;
      }
    } catch (e: any) {
      message.error('修改状态错误:' + e.message);
      return false;
    }
  };

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfoAddRequest) => {
    const hide = message.loading('正在添加');
    try {
      const res = await addInterfaceInfoUsingPost({
        ...fields,
      });
      hide();

      if (res?.code === 0) {
        message.success('新增接口success');
        actionRef.current?.reload();
        handleAddModalVisible(false);

        return true;
      } else {
        message.error(res?.message);
        return false;
      }
    } catch (error: any) {
      hide();
      message.error('新增接口error:' + error?.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfoUpdateRequest) => {
    const hide = message.loading('Configuring');
    if (currentId && currentId < 1) {
      message.error('请先选择要修改的数据');
    }
    try {
      console.log(fields);
      const res = await updateInterfaceInfoUsingPost({ ...fields, id: currentId });
      hide();
      if (res.code === 0) {
        message.success('编辑成功：success');
        actionRef.current?.reload();
        handleUpdateModalVisible(false);
      }
      return true;
    } catch (error) {
      hide();
      message.error('Configuration failed, please try again!');
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedId
   */
  const handleRemove = async (selectedId: API.IdRequest) => {
    const hide = message.loading('正在删除');
    if (!selectedId) return true;
    try {
      const res = await deleteInterfaceInfoUsingPost(selectedId);
      if (res.code === 0) {
        message.success('删除成功');
      }
      actionRef.current?.reload();
      hide();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败：' + error.message);
      return false;
    }
  };

  const requestMethodEnum = {
    GET: {
      text: 'GET',
    },
    POST: {
      text: 'POST',
    },
    UPDATE: {
      text: 'UPDATE',
    },
    DELETE: {
      text: 'DELETE',
    },
  };

  // columns类型统一为ProColumns<API.InterfaceInfoVO>[]
  const columns: ProColumns<API.InterfaceInfoVO>[] = [
    {
      title: '接口名称',
      dataIndex: 'name',
    },
    {
      title: '接口描述',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: '请求方式',
      dataIndex: 'method',
      valueEnum: requestMethodEnum,
    },
    {
      title: '服务地址',
      dataIndex: 'host',
      valueType: 'text',
    },
    {
      title: '请求路径',
      dataIndex: 'url',
      valueType: 'textarea',
    },
    {
      title: '请求参数',
      dataIndex: 'requestParam',
      valueType: 'jsonCode',
      hideInTable: true,
      hideInSearch: true,
      initialValue:
        '[\n' + '  {\n' + '    "name": "filed",\n' + '    "type": "string"\n' + '  }\n' + ']',
      fieldProps: {
        style: { minHeight: 200 },
        placeholder:
          '[\n' + '  {\n' + '    "name": "filed",\n' + '    "type": "string"\n' + '  }\n' + ']',
      },
      formItemProps: {
        rules: [
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();
              try {
                JSON.parse(value);
                return Promise.resolve();
              } catch {
                return Promise.reject('请输入合法的 JSON 格式');
              }
            },
          },
        ],
      },
    },
    {
      title: '请求参数示例',
      dataIndex: 'sampleRequestParam',
      valueType: 'jsonCode',
      hideInTable: true,
      hideInSearch: true,
      initialValue: '{\n' + '  "filed": "value1"\n' + '}',
      fieldProps: {
        style: { minHeight: 200 },
        placeholder: '{\n' + '  "filed": "value1"\n' + '}',
      },
      formItemProps: {
        rules: [
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();
              try {
                JSON.parse(value);
                return Promise.resolve();
              } catch {
                return Promise.reject('请输入合法的 JSON 格式');
              }
            },
          },
        ],
      },
    },
    {
      title: '消耗/每次',
      dataIndex: 'consumeMiCurrency',
      valueType: 'digit',
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'jsonCode',
      hideInTable: true,
      hideInSearch: true,
      initialValue: '{\n' + '  "Content-Type": "application/json"\n' + '}',
      fieldProps: {
        style: { minHeight: 200 },
        placeholder: '{\n' + '  "Content-Type": "application/json"\n' + '}',
      },
      formItemProps: {
        rules: [
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();
              try {
                JSON.parse(value);
                return Promise.resolve();
              } catch {
                return Promise.reject('请输入合法的 JSON 格式');
              }
            },
          },
        ],
      },
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'jsonCode',
      hideInTable: true,
      hideInSearch: true,
      initialValue: '{\n' + '  "Content-Type": "application/json"\n' + '}',
      fieldProps: {
        style: { minHeight: 200 },
        placeholder: '{\n' + '  "Content-Type": "application/json"\n' + '}',
      },
      formItemProps: {
        rules: [
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();
              try {
                JSON.parse(value);
                return Promise.resolve();
              } catch {
                return Promise.reject('请输入合法的 JSON 格式');
              }
            },
          },
        ],
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '已上线',
          status: 'Processing',
        },
        1: {
          text: '已下线',
          status: 'Default',
        },
      },
    },
    {
      title: '修改时间',
      sorter: true,
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
      renderFormItem: (item: any, { defaultRender, ...rest }: any, form: any) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder={'请输入异常原因！'} />;
        }
        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, record: any) => {
        return [
          <a
            key="remove"
            onClick={async () => {
              await handleRemove({
                id: record.id,
              });
            }}
          >
            删除
          </a>,
          <a
            key="config"
            onClick={() => {
              setCurrentId(record.id);
              handleUpdateModalVisible(true);
              setCurrentRow(record);
            }}
          >
            修改
          </a>,
          <>
            {record.status === 0 ? (
              <a
                onClick={async () => {
                  await offLineInterface({
                    id: record.id,
                  });
                }}
              >
                下线
              </a>
            ) : (
              <a
                onClick={async () => {
                  await onLineInterface({
                    id: record.id,
                  });
                }}
              >
                发布
              </a>
            )}
          </>,
        ];
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.InterfaceInfoAddRequest, API.PageParams>
        headerTitle={'接口信息'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleAddModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async (params) => {
          const res = await listInterfaceInfoVoByPageUsingPost({
            ...params,
          });
          if (res?.data) {
            return {
              data: res.data?.records,
              success: true,
              total: res.data?.total,
            };
          }
          return {
            data: [],
            success: false,
            total: 0,
          };
        }}
        columns={columns}
      />

      <UpdateForm
        columns={columns}
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.InterfaceInfoAddRequest>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.InterfaceInfoAddRequest>[]}
          />
        )}
      </Drawer>
      <AddInterfaceForm
        columns={columns}
        visible={addModalVisible}
        onSubmit={async (values: API.InterfaceInfoAddRequest) => {
          await handleAdd(values);
        }}
        onCancel={() => {
          handleAddModalVisible(false);
        }}
      />
    </PageContainer>
  );
};
export default TableList;
