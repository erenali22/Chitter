import { login } from '@/api';
import { Button, Modal, Checkbox, Form, Input, message } from 'antd';
import React, { useState } from 'react';

const Login = ({ isOpen, close }) => {
  const [form] = Form.useForm();
  const [loading,setLoading] = useState(false)

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
    setLoading(true);
    const response = await login(values);
    setLoading(false);
    response.json().then((res)=>{
      if(res?.errors){
        message.error(res?.errors?.toString?.()|| 'error');
        return
      }else{
        message.success('Login succeeded！')
        close()
      }
    })
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    const demoUserCredentials = {
        email: 'demo@aa.io',
        password: 'password',
    };
    const response = await login(demoUserCredentials);
    setLoading(false);
    response.json().then((res) => {
        if (res?.errors) {
            message.error(res?.errors?.toString?.() || 'error');
            return;
        } else {
            message.success('Login succeeded!');
            close();
        }
    });
  };

  return (
    <>
      <Modal okButtonProps={{loading}}  forceRender okText={'Submit'} title="Login In Chitter" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
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

          <Form.Item>
            <Button type="primary" onClick={handleDemoLogin}>
              Login as Demo User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Login;
