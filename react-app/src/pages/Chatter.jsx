import { newChater } from '@/api';
import { Input, Form, Button, message,Spin } from 'antd';
import React, { useState } from 'react';
const { TextArea } = Input;

const Chatter = () => {
  const [form]  = Form.useForm()
  const [loading,setIsloading] = useState(false)
    return (<div style={{ paddingRight: 20 }}>
       <Form form={form} onFinish={(v) => {
      if(!v?.content){
        message.error('Content cannot be empty！')
        return;
      }
      setIsloading(true)
        newChater(v?.content).then((res) => {
          setIsloading(false)
          if(!res?.errors){
            message.success('Successfully published!');
            form.resetFields()
          }else{
            message.error('error: ' + res?.errors?.toString?.() || '');
          }
        }).catch((err) => {
            message.error('error');
            setIsloading(false)
        });
    }}
    >
      <Form.Item name={'content'}>
        <TextArea rows={4} style={{borderRadius:10,marginTop:100}}/>
      </Form.Item>
      <Form.Item>
        <Button loading={loading} htmlType="submit" type="primary">
          Add Chatter
        </Button>
      </Form.Item>
    </Form> </div>);
};
export default Chatter;