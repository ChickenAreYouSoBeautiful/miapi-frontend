import '@umijs/max';
import { Modal } from 'antd';
import React, {useEffect, useRef} from 'react';
import {ProTable} from "@ant-design/pro-table/lib";
import {ProColumns} from "@ant-design/pro-table";
import {ProFormInstance} from "@ant-design/pro-form/lib";


export type UpdateFormProps = {
  columns: ProColumns<API.InterfaceInfoVO>[]
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfoUpdateRequest) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.InterfaceInfoVO>;
};
const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const {columns,onCancel,onSubmit,updateModalVisible,values} = props
  const formRef = useRef<ProFormInstance>();

  useEffect(()=>{
    if (formRef){
      formRef.current?.setFieldsValue(values);
    }
  },[values,])

  return (
    <Modal visible={updateModalVisible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        type={'form'}
        columns={columns}
        onSubmit={async (values: API.InterfaceInfoUpdateRequest)=>{
         await  onSubmit?.(values);
        }}
        formRef={formRef}
      />
    </Modal>
  );
};
export default UpdateForm;
