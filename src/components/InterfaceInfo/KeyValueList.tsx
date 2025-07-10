import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export interface KeyValueListProps {
  value?: Record<string, any>;
  onChange?: (value: Record<string, any>) => void;
  placeholderKey?: string;
  placeholderValue?: string;
}

const KeyValueList: React.FC<KeyValueListProps> = ({
  value = {},
  onChange,
  placeholderKey = '键',
  placeholderValue = '值',
}) => {
  const initial = Object.entries(value).map(([k, v]) => ({ key: k, value: v }));

  return (
    <Form.List name="kvList" initialValue={initial.length ? initial : [{ key: '', value: '' }]}>
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map((field, idx) => (
            <Space key={field.key} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
              <Form.Item
                {...field}
                name={[field.name, 'key']}
                rules={[{ required: true, message: '请输入键' }]}
                noStyle
              >
                <Input placeholder={placeholderKey} style={{ width: 120 }} />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, 'value']}
                rules={[{ required: true, message: '请输入值' }]}
                noStyle
              >
                <Input placeholder={placeholderValue} style={{ width: 220 }} />
              </Form.Item>
              {fields.length > 1 ? (
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              ) : null}
            </Space>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              icon={<PlusOutlined />}
              style={{ width: 360 }}
            >
              添加
            </Button>
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default KeyValueList;
