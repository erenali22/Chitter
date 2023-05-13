import { newChater } from '@/api';
import { Input, Form, Button, message } from 'antd';
import React from 'react';
const { TextArea } = Input;

const Chatter = () => {
    return (<div style={{ paddingRight: 20 }}> <Form onFinish={(v) => {
        newChater(v?.content).then(() => {
            message.success('success!');
        }).catch(() => {
            message.error('error');
        });
    }}
    >
      <Form.Item name={'content'}>
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Add Chatter
        </Button>
      </Form.Item>
    </Form> </div>);
};
export default Chatter;