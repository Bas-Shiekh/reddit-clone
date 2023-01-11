import {
  CommentOutlined,
  DownOutlined,
  SaveOutlined,
  UpOutlined
} from "@ant-design/icons";
import { formatDistance, parseISO } from "date-fns";
import { IPostProps } from "../../utils/interfaces";
import './index.css';

const Post = ({ post }: IPostProps) => {
  console.log(post);
  return (
    <div className='post'>
      <div className='votes'>
        <UpOutlined />
        <p>0</p>
        <DownOutlined />
      </div>
      <article>
        <div className='post-info'>
          <img src={post.user.userImg} alt={post.user.username} />
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
          <button type="button">
            <CommentOutlined />
            <label>{post.commentsCount} Comments</label>
          </button>
          <button type="button">
            <SaveOutlined />
            <label>Save</label>
          </button>
        </div>
      </article>
    </div>
  )
}

export default Post;