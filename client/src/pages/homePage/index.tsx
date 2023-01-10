import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, CreatePost, FilterPostBox, Post } from '../../components';
import { login } from '../../features/auth/authSlice';
import './index.css';

const HomePage = () => {
  const dispatch = useDispatch();

  const auth: any = useSelector((state: any) => state?.auth);

  useEffect(() => {
    dispatch(login())
  }, [dispatch]);

  return (<>
    <Header user={auth.user} />
    <main id='homepage'>
      <CreatePost user={auth.user} />
      <FilterPostBox />
      <section className='posts-container'><Post user={auth.user}/></section>
    </main>
  </>)
}
  
export default HomePage;