import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, CreatePost, FilterPostBox, Post } from '../../components';
import { login } from '../../features/auth/authSlice';
import { IPost } from '../../utils/interfaces';
import './index.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const auth: any = useSelector((state: any) => state?.auth);
  const [posts, setPosts] = useState<IPost[] | null>(null);

  useEffect(() => {
    dispatch(login())
  }, [dispatch]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios.get('posts');
      if (response.status === 200) {
        setPosts(response.data);
      } else throw response;
    }
    getPosts();
  }, []);

  return (<>
    <Header user={auth.user} />
    <main id='homepage'>
      <CreatePost user={auth.user} />
      <FilterPostBox />
      <section className='posts-container'>
        {posts?.map((post: IPost, i: number) => <Post
          user={auth.user}
          post={post} key={i}
          />)}
      </section>
    </main>
  </>)
}
  
export default HomePage;