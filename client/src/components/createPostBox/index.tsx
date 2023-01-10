import { LinkOutlined, PictureOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../utils/interfaces";
import './index.css';

const CreatePost = ({ user }: IUser) => {
  const navigate = useNavigate();

  const createPostCheck = () => {
    if (!user) navigate('login')
    else navigate('post/create')
  }

  return (
    <div className="create-post-row">
      <Link to='/'>
        <img src={user?.userImg ? user?.userImg : 'https://i.ibb.co/kKPN0DZ/kisspng-social-media-reddit-computer-icons-logo-reddit-logo-social-icon-5ab1498d75d271-0862203515215.png'} alt={user?.username} />
      </Link>
      <input type='text' placeholder="Create Post" onClick={createPostCheck}/>
      <PictureOutlined onClick={createPostCheck} />
      <LinkOutlined onClick={createPostCheck} />
    </div>
  );
}

export default CreatePost;