import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components';
import { login } from '../../features/auth/authSlice';
import './index.css';

const HomePage = () => {
  const dispatch = useDispatch();

  const auth: any = useSelector((state: any) => state?.auth);
  useEffect(() => {
    dispatch(login())
  }, [dispatch]);
  
  return (<>
    <Header id={auth.user?.id} username={auth.user?.username} />
  </>)
}
  
export default HomePage;