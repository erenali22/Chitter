
import { createReply, deleteReply, getReplies, updateReply } from '@/api';
import { formatDate, getRandomProfilePicture } from '@/utils';
import { Comment, List, Tooltip, Input, Form, Button, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
const { TextArea } = Input;
const Editor = ({ id, getAllReplies }) => (
  <>
    <Form onFinish={(v) => {
 createReply(id, v.content).then(() => {
    getAllReplies();
        message.success('success');
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
          Add Comment
        </Button>
      </Form.Item>
    </Form>

  </>
  );

const MyComment = ({ id,userInfo }) => {
    const [list, setList] = useState();
    const [isLoading, setIdLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        <span>comment list</span>
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
                actions={userInfo?.id === item?.user?.id ? [<span
                  key="comment-list-reply-to-0"
                  onClick={() => {
                    deleteReply(item.id).then(() => {
                        getAllReplies();
                    });
                }}
                >delete</span>, <span onClick={() => setIsModalOpen(true)} key="comment-list-reply-to-1">edit</span>] : []}
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
        <Modal title="edit" open={isModalOpen} onOk={() => {}} onCancel={() => setIsModalOpen(false)}>
          <Form onFinish={(v) => {
            updateReply(id, v.content).then(() => {}).finally(() => {
                setIsModalOpen(false);
                getAllReplies();
            });
          }}
          >
            <Form.Item name="content">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Edit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      );
};
export default MyComment;