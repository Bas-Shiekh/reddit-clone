import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Avatar, Form, Input, message } from "antd";
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
  const [votesNumber, setVotesNumber] = useState<number>(0)
  const [voteStatus, setVoteStatus] = useState<string | null>(null)
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const getVotesNumber = async () => {
      const response = await axios.get(`post/${post.id}/vote`);
      setVotesNumber(response.data[0].totalVotes)
    }
    getVotesNumber();
  }, [post.id])

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

  const vote = async (status: string) => {
    if (!user) {
      navigate('login')
    } else {
      const response = await axios.post(`post/${post.id}/vote/${status}`);
      if (response.status === 201) {
        console.log(response.data)
        setVoteStatus(status);
        setVotesNumber((prev) => Number(prev) + response.data.status)
      }
    }
  } 

  const addSave = async () => {
    if (!user) {
      navigate('login')
    } else {
      const response = await axios.post(`save/${post.id}`);
      if (response.status === 201) {
        message.success(response.data.message)
      }
    }
  } 

  return (
    <div className='post'>
      <div className='votes'>
        <UpOutlined onClick={() => vote('up')}
          style={{ color: voteStatus === 'up' ? 'var(--main-color)' : 'var(--second-color)' }} />
        <p>{votesNumber}</p>
        <DownOutlined onClick={() => vote('down')}
          style={{ color: voteStatus === 'down' ? 'var(--blue)' : 'var(--second-color)' }}
        />
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
          <button type="button" onClick={addSave}>
            <SaveOutlined />
            <label>Save</label>
          </button>
        </div>
        <section id="comments-container">
          <Form onFinish={onFinish}>
            <Form.Item name='content'><Input placeholder="Press your comment" /></Form.Item>
          </Form>
          {comments?.map((comment: IComment, i: number) => <Comment comment={comment} key={i} />)}
        </section>
      </article>
    </div>
  )
}

export default Post;