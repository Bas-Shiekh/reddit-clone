import { Button, Form, Input, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "../../api/axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components";
import './index.css';

interface IPostForm {
  title: string;
  content: string;
  tags: string;
}

const options = [
  { value: 'Games'},
  { value: 'News' },
  { value: 'Sport' },
  { value: 'Fashion' }
];

const CreatePostPage = () => {
  const { user }: any = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/')
  }, [navigate, user]);

  const onFinish = async (values: IPostForm) => {
    console.log(values);
    try {
      const response = await axios.post('posts/submit', values);
      if (response.status === 201) {
        message.success(response.data.message);
        navigate('/');
      } else throw response
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  }

  return (
    <>
      <Header user={user} />
      <main id="create-post">
        <Form name="create_post" onFinish={onFinish} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '650px',
          backgroundColor: 'var(--white)',
          padding: '1rem 2rem',
          borderRadius: '5px',
        }}>
          <Form.Item name="title" style={{
              backgroundColor: 'var(--search-color)',
              width: '100%',
            }} >
            <Input placeholder="Press title here" />
          </Form.Item>
          <Form.Item name="content" style={{
            backgroundColor: 'var(--search-color)',
            width: '100%',
          }}>
            <TextArea placeholder="Press content here"></TextArea>
          </Form.Item>
          <Form.Item style={{ width: '100%' }} name="topicName">
            <Select
              showArrow
              options={options}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      </main>
    </>
  )
}

export default CreatePostPage;