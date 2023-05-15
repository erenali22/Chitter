import { likeChatter } from '@/api';
import { formatDate, getRandomProfilePicture } from '@/utils';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space, Modal, Form, Input, Button, message } from 'antd';
import React, { useState } from 'react';
import { createRechatter, deleteChatter, updateChatter } from '../api';
import MyComment from './Comment';

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: 'https://ant.design',
  title: `${i}`,
  avatar: 'https://joeschmoe.io/api/v1/random',
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const MyList = ({ chatters, userInfo, fetchData }) => {
  const [showId, setShowId] = useState(undefined);
  const [editId, setEditId] = useState(false);
  const [rechatterId, setRechatterId] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [rechatterModalVisible, setRechatterModalVisible] = useState(false);
  const [rechatterContent, setRechatterContent] = useState("");
  const [form] = Form.useForm()
  console.log(showId);
  const handleRechatterClick = (content) => {
    setRechatterModalVisible(true);
    setRechatterContent(content);
  };

  const handleRechatterConfirm = async (value) => {
    await createRechatter(rechatterId, value.content);
    setRechatterModalVisible(false);
    fetchData();
  };
  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        // pagination={{
        //   onChange: (page) => {
        //     console.log(page);
        //   },
        //   pageSize: 3,
        // }}
        dataSource={chatters}
        style={{ paddingBottom: 100 }}
        loading={!chatters?.length}
        renderItem={(item) => (
          <div>

            <List.Item
              key={item?.user?.username}
              actions={userInfo?.id !== item?.user?.id ? [
                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                <div onClick={() => likeChatter(item.id)}><IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" /></div>,
                <div onClick={() => setShowId((id) => (id === item.id ? undefined : item.id))}><IconText icon={MessageOutlined} text="" key="list-vertical-message" /></div>,
                <div onClick={() => { handleRechatterClick(item.content); setRechatterId(item.id) }}>Rechatter</div>
              ] : [
                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                <div onClick={() => likeChatter(item.id)}><IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" /></div>,
                <div onClick={() => setShowId((id) => (id === item.id ? undefined : item.id))}><IconText icon={MessageOutlined} text="" key="list-vertical-message" /></div>,
                <div onClick={() => {
                  deleteChatter(item.id).finally(() => {
                    message.success('success')
                    fetchData()
                  })
                }}>delete</div>,
                <div onClick={() => {
                  form.setFieldValue('content', item.content)
                  setEditId(item.id)
                }}>edit</div>
              ]}
              extra={
                <img
                  width={272}
                  height={168}
                  alt="logo"
                  src={item?.media_url || 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'}
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item?.avatar || getRandomProfilePicture()} />}
                title={<a href={item.href}>{item?.user?.username}</a>}
                description={item?.created_at ? formatDate(item?.created_at) : item?.user?.email}
              />
              {item.content}
            </List.Item>
            {
              item.id === showId && <div style={{ width: '100%' }}>
                <MyComment id={item.id} userInfo={userInfo} />

              </div>
            }
          </div>

        )}
      />

      <Modal okButtonProps={{ loading }} title="edit" forceRender open={!!editId} onOk={() => {
        form.submit()
      }} onCancel={() => setEditId(false)}>
        <Form form={form} onFinish={(v) => {
          if (!v?.content) {
            message.error('Content cannot be empty！')
            return;
          }
          setLoading(true)
          updateChatter(editId, v.content).then((res) => {
            if (!res?.errors) {
              message.success('Successfully published!');
              setEditId(false);
              fetchData();

            } else {
              message.error('error: ' + res?.errors?.toString?.() || '');
            }
          }).catch(()=>{
            message.error('error')
          }).finally(() => {

            setLoading(false)
          });
        }}
        >
          <Form.Item name="content">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {
        rechatterModalVisible && <Modal
          title="Rechatter"
          visible={rechatterModalVisible}
          onCancel={() => setRechatterModalVisible(false)}
        >
          <Form onFinish={handleRechatterConfirm}>
            <Form.Item name="content" initialValue={rechatterContent}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      }

    </>

  );
};
export default MyList;