import {
  CommentOutlined,
  DownOutlined,
  SaveOutlined,
  UpOutlined
} from "@ant-design/icons";
import { IPostProps } from "../../utils/interfaces";
import './index.css';

const Post = ({ user, post }: IPostProps) => {

  return (
    <div className='post'>
      <div className='votes'>
        <UpOutlined />
        <p>0</p>
        <DownOutlined />
      </div>
      <article>
        <div className='post-info'>
          <img src={user?.userImg} alt={user?.username} />
          <p>{user?.username}</p>
          <label> . posted 1 day ago</label>
        </div>
        <div className='post-title'>
          <h1>{post.title}</h1>
        </div>
        <div className='post-description'>
          <p>{post.content}</p>
        </div>
        {post.postImg && <div className='post-img'>
          <img src={post.postImg} alt={user?.username} />
        </div>}
        <div className='post-events'>
          <button type="button">
            <CommentOutlined />
            <label>Comments</label>
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