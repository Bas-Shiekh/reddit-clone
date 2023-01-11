import { Avatar } from "antd";
import { formatDistance, parseISO } from "date-fns";
import { IComment } from "../../utils/interfaces";
import './index.css';

const Comment = ({comment}: {comment: IComment}) => {
  return (
    <div className="comment">
      <div className='comment-info'>
        <Avatar size={25} src={comment.user.userImg} alt={comment.user.username} style={{backgroundColor: '#cdcdcd', padding: '0.1rem'}} />
        <p>{comment.user.username}</p>
        <label> . {formatDistance(parseISO(comment?.createdAt), new Date(), { addSuffix: true })}</label>
      </div>
      <div className="comment-content">
        <p>{comment.content}</p>
      </div>
    </div>
  )
}

export default Comment;