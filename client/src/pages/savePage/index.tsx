import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Header, Post } from "../../components";
import { login } from "../../features/auth/authSlice";
import { IPost } from "../../utils/interfaces";
import './index.css';

const SavePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const auth: any = useSelector((state: any) => state?.auth);
  const [posts, setPosts] = useState<IPost[] | null>(null);
  
  useEffect(() => {
    dispatch(login())
  }, [dispatch]);
  
  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get('save');
      if (response.status === 200) {
        const data = response.data.map((post: { post: IPost }) => {
          return { 
            id: post.post.id,
            content: post.post.content,
            createdAt: post.post.createdAt,
            updatedAt: post.post.updatedAt,
            userId: post.post.userId,
            postImg: post.post.postImg,
            topicName: post.post.topicName,
            user: { username: post.post.user.username, userImg: post.post.user.userImg }
          } 
        });
        setPosts(data);
      } else throw response;
    }
    if (auth.user) getPosts();
  }, [auth.user, navigate]);
  
    return (<>
      <Header user={auth.user} />
      <main id='save-page'>
        <section className='posts-container'>
          {posts?.map((post: IPost, i: number) => <Post
            post={post} key={i}
            />)}
        </section>
      </main>
    </>)
}

export default SavePage;