import { useState } from "react";
import axios from "../../api/axios";
import { Avatar, Form, Input } from "antd";
import {
  CommentOutlined,
  DownOutlined,
  SaveOutlined,
  UpOutlined
} from "@ant-design/icons";
import { formatDistance, parseISO } from "date-fns";
import { Comment } from '../';
import { IComment, IPostProps } from "../../utils/interfaces";
import './index.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Post = ({ post }: IPostProps) => {
  const [comments, setComments] = useState<IComment[] | null>(null);
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();

  const getComments = async () => {
    const response = await axios.get(`comments/${post.id}`);
    if (response.status === 200) {
      setComments(response.data);
    }
  }

  const onFinish = async ({ content }: { content: string }) => {
    if (!user) {
      navigate('login')
    } else {
      const response = await axios.post(`comments/${post.id}/create`, {content});
      if (response.status === 201) {
        console.log(response.data);
      }
    }
  } 

  return (
    <div className='post'>
      <div className='votes'>
        <UpOutlined />
        <p>0</p>
        <DownOutlined />
      </div>
      <article>
        <div className='post-info'>
          <Avatar src={post.user.userImg} alt={post.user.username} style={{backgroundColor: '#cdcdcd', padding: '0.1rem'}} />
          <p>{post.user.username}</p>
          <label> . posted {formatDistance(parseISO(post?.createdAt), new Date(), { addSuffix: true })}</label>
        </div>
        <div className='post-title'>
          <h1>{post.title}</h1>
        </div>
        <div className='post-description'>
          <p>{post.content}</p>
        </div>
        {post.postImg && <div className='post-img'>
          <img src={post.postImg} alt={post?.user.username} />
        </div>}
        <div className='post-events'>
          <button type="button" onClick={getComments}>
            <CommentOutlined />
            <label>{post.commentsCount} Comments</label>
          </button>
          <button type="button">
            <SaveOutlined />
            <label>Save</label>
          </button>
        </div>
        <section id="comments-container">
          <Form onFinish={onFinish}><Form.Item name='content'><Input placeholder="Press your comment"/></Form.Item></Form>
          {comments?.map((comment: IComment, i: number) => <Comment comment={comment} key={i} />)}
        </section>
      </article>
    </div>
  )
}

export default Post;