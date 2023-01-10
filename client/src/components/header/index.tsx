import { RedditCircleFilled, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { Link } from "react-router-dom";
import './index.css'

const Header = ({id, username}: {username: string, id: number}) => {
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
        <Link to='login' id="login-btn">log in</Link>
        <Popover
          placement="bottom"
          content={
            <div
              className="dropDown"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                padding: "0.5rem 0",
              }}
            >
              <Link to=''>view Profile</Link>
              <Link to="/">Logout</Link>
            </div>
          }
          trigger="click"
          className="drop"
        >
          <div>
            <UserOutlined style={{ fontSize: '1.5rem', opacity: '0.5' }} />
            <h1>{username}</h1>
          </div>
        </Popover>
        <p>{username}{id}</p>
      </div>
    </header>
  )
}

export default Header;