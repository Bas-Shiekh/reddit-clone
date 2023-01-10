import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../api/axios';
import { Button, Form, Input, message, Spin } from 'antd';
import { GoogleOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { ILogin } from '../../utils/interfaces';
import { EmailSchema, PasswordSchema } from '../../utils/schemas';
import { background } from '../../assets';
import './index.css';

const LoginPage = () => {
  const { user }: any = useSelector(({auth}: any) => auth);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [navigate, user]);

  const onFinish = async (values: ILogin) => {
    try {
      setLoading(true);
      const response = await axios.post('/auth/login', values, { withCredentials: true });
      if (response.status === 200) {
        message.success('Logging in successfully');
        navigate('/');
      } else throw response
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      message.error(error.response.data.message);
    }
  }

  return (
    <main id='login'>
      <header>
        <img src={background} alt='login side' />
      </header>
      <section>
        <div className='header'>
          <h3>Log in</h3>
          <p>By continuing, you agree to our <a href='https://www.redditinc.com/policies/user-agreement'>User Agreement</a> and <a href='https://www.reddit.com/policies/privacy-policy'>Privacy Policy</a>.</p>
        </div>
        <div className='login-container'>
          <div className='google-apple-buttons'>
            <button type='button'>
              <GoogleOutlined />
              <label>continue with google</label>
            </button>
          </div>
          <div className='hr'>
            <hr />
            <label>or</label>
            <hr />
          </div>
          <div className='login-form'>
            {loading ? <Spin tip="Loading" size="large" /> :
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  ...EmailSchema,
                  { type: 'email', message: 'Invalid Email' }]}
                hasFeedback
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" style={{
                    width: '100%', 
                    padding: '0.5rem', 
                    height: 'auto'}}/>
              </Form.Item>
              <Form.Item
                name="password"
                rules={PasswordSchema}
                hasFeedback
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  style={{
                    width: '100%', 
                    padding: '0.5rem', 
                    height: 'auto'}}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button"
                style={{
                  width: '100%', 
                  background: '#0079d3', 
                  fontWeight: '600', 
                  textTransform: 'uppercase', 
                  padding: '0.5rem', 
                  height: 'auto'
                }}>
                  Log in
                </Button>
              </Form.Item>
              <p>
                Forget your <Link className="login-form-forgot" to="">
                  email
                </Link> or <Link className="login-form-forgot" to="">
                  password
                </Link> ?
              </p>
              <p>New to reddit? <Link to="/register" className='signUpBtn'>Sign up</Link></p>
            </Form>}
          </div>
        </div>
      </section>
    </main>
  )
}

export default LoginPage;