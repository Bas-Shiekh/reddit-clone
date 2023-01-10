import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../../api/axios";
import { message, Popover } from "antd";
import {
  DownOutlined,
  RedditCircleFilled,
  SearchOutlined,
  UserOutlined
} from "@ant-design/icons";

import { logout } from '../../features/auth/authSlice';
import { IUser } from "../../utils/interfaces";
import './index.css'



const Header = ({ user }: IUser) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
      const response = await axios.get('auth/logout', { withCredentials: true });
      if (response.status === 200) {
        message.success(response.data.message);
        dispatch(logout());
      } else throw response;
  }
  
  return (
    <header id="header">
      <div>
        <Link to="/">
          <RedditCircleFilled style={{ fontSize: '2rem', color: 'var(--main-color)' }} />
          <h1>redd<span>i</span>t</h1>
        </Link>
      </div>
      <div>
        <SearchOutlined style={{
          position: 'absolute',
          left: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--second-search-color)',
          fontSize: '1.5rem'
        }}/>
        <input type="search" placeholder="Search Reddit" />
      </div>
      <div>
        {user?.username ? 
          <Popover
            placement="bottom"
            content={
              <div
                className="dropDown"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  padding: "0.5rem 0",
                  width: '100%'
                }}
              >
                <Link to='' style={{color: 'var(--black)'}} className='header-link'>view Profile</Link>
                <Link to="/"
                  style={{ color: 'var(--black)' }}
                  className='header-link'
                  onClick={() => {
                    dispatch(logout());
                    handleLogout();
                  }}
                >Logout</Link>
              </div>
            }
            trigger="click"
            className="drop"
          >
            <div className="user-popup">
              <img src={user?.userImg} alt={user?.username} className='header-profile-img' />
              <div>
                <p>{user?.username}</p>
                <label>1 karma</label>
              </div>
              <DownOutlined style={{ fontSize: '0.9rem', opacity: '0.5', color: 'var(--black)'}} />
            </div>
          </Popover>
        : 
          <>
            <Link to='login' id="login-btn">log in</Link>
            <div className="user-popup">
              <UserOutlined style={{ fontSize: '1.5rem', opacity: '0.5' }} />
              <DownOutlined style={{ fontSize: '0.9rem', opacity: '0.5' }} />
            </div>
          </>
        }
      </div>
    </header>
  )
}

export default Header;