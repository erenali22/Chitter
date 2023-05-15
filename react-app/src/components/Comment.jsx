
import { createReply, deleteReply, getReplies, updateReply } from '@/api';
import { formatDate, getRandomProfilePicture } from '@/utils';
import { Comment, List, Tooltip, Input, Form, Button, message, Modal, Popconfirm } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
const { TextArea } = Input;
const Editor = ({ id, getAllReplies }) => {
  const [form] = Form.useForm()
  const [loading, setIsloading] = useState(false)
  return (
    <>
      <Form form={form} onFinish={(v) => {
        if (!v?.content) {
          message.error('Content cannot be empty！')
          return;
        }
        setIsloading(true)
        createReply(id, v.content).then((res) => {
          if(!res?.errors){
            message.success('Successfully posted!');
            form.resetFields()
          getAllReplies();
          }else{
            message.error('error: ' + res?.errors?.toString?.() || '');
          }
        }).catch(() => {
          message.error('error');
        }).finally(() => {
          setIsloading(false)
        });
      }}
      >
        <Form.Item name={'content'}>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} htmlType="submit" type="primary">
            Add Comment
          </Button>
        </Form.Item>
      </Form>

    </>
  )
};

const MyComment = ({ id, userInfo }) => {
  const [list, setList] = useState();
  const [isLoading, setIdLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm()
  const [pushLoading, setPushLoading] = useState(false)
  const commentIdRef = useRef()
  const getAllReplies = () => {
    getReplies(id).then((res) => {
      console.log(res);
      setList(res);
    }).finally(() => {
      setIdLoading(false);
    });
  };
  useEffect(() => {
    getAllReplies();
  }, [id]);
  return (
    <div style={{ width: '90%', padding: '10px 70px 0 70px', border: '1px solid #ccc', borderRadius: 6 }}>
      <List
        loading={isLoading}
        className="comment-list"
        // header={`${data.length} replies`}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <li style={{ color: '#333' }}>
            <Comment
              style={{ fontSize: 12 }}
              actions={userInfo?.id === item?.user?.id ? [<Popconfirm
                title="Are you sure you want to delete this reply?"
                okButtonProps={{ loading: pushLoading }}
                onConfirm={() => {
                  setPushLoading(true)
                  deleteReply(item.id).then(() => {
                    getAllReplies();
                  }).finally(() => {
                    setPushLoading(false)
                  });
                }}
                onCancel={() => { }}
                okText="Yes"
                cancelText="No"
              >
                <span
                  key="comment-list-reply-to-0"
                >delete</span>
              </Popconfirm>, <span onClick={() => {
                setIsModalOpen(true);
                commentIdRef.current = item.id
              }} key="comment-list-reply-to-1">edit</span>] : []}
              author={item?.user?.username}
              avatar={getRandomProfilePicture()}
              content={item.content}
              datetime={<Tooltip title={formatDate(item?.created_at)}>
                <span>{formatDate(item?.created_at)}</span>
              </Tooltip>}
            />
          </li>
        )}
      />
      <Editor id={id} getAllReplies={getAllReplies} />
      <Modal okButtonProps={{ loading: pushLoading }} forceRender title="edit" open={isModalOpen} onOk={() => {
        form.submit()
      }} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} onFinish={(v) => {
          if (!v.content) {
            message.error('Content cannot be empty！')
            return;
          }
          setPushLoading(true)
          updateReply(commentIdRef.current, v.content).then((res) => {
            console.log(res);
            if (!res?.errors) {
              message.success('Successfully posted!');
              form.resetFields()
            } else {
              message.error('error: ' + res?.errors?.toString?.() || '');
            }
          }).catch((res) => {
            message.error('Editing failed!');
          }).finally(() => {
            setPushLoading(false)
            setIsModalOpen(false);
            getAllReplies();
          });
        }}
        >
          <Form.Item name="content">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default MyComment;
