import '@umijs/max';

import React from 'react';
import {ProTable} from "@ant-design/pro-table/lib";
import {Modal} from "antd";

import {ProColumns} from "@ant-design/pro-table";


export type AddProps = {
  columns: ProColumns<API.InterfaceInfoVO>[],
  onCancel: ()=> void,
  onSubmit: (values: API.InterfaceInfoVO)=> Promise<void>,
  visible: boolean
}

const AddInterfaceForm: React.FC<AddProps> = (props) => {
  const {columns,visible,onCancel,onSubmit} = props;

  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={() => onCancel?.()}
    >
      <ProTable
        type={'form'}
        columns={columns}
        onSubmit={async (values) =>{
          await onSubmit?.(values);
        }}
      />
    </Modal>

  );
};
export default AddInterfaceForm;
