import { login } from '@/api';
import { Button, Modal, Checkbox, Form, Input, message } from 'antd';
import React, { useState } from 'react';
const Login = ({ isOpen, close }) => {
  const [form] = Form.useForm();
  const showModal = () => {
    close(true);
  };
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    close(false);
  };
  const onFinish = async (values) => {
    console.log(values);

    const response = await login(values);
    response.json().then((res)=>{
      if(res?.error){
        message.error('error')
        return
      }else{
        message.success('success')
        close()
      }
    })
	
  };
  return (
    <>
      <Modal forceRender okText={'Submit'} title="Login In Twitter" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          name="basic"
          labelCol={{
        span: 6,
      }}
          wrapperCol={{
        span: 16,
      }}
          initialValues={{
        remember: true,
      }}
          onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Login;