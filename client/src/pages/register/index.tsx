import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../api/axios';
import { Button, Form, Input, message, Spin } from 'antd';
import { GoogleOutlined, UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { EmailSchema, PasswordSchema, UsernameSchema } from '../../utils/schemas';
import { IRegister } from '../../utils/interfaces';
import { background } from '../../assets';
import './index.css';

const RegisterPage = () => {
  const { user }: any = useSelector(({ auth }: any) => auth);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [navigate, user]);
  
  const onFinish = async (values: IRegister) => {
    try {
      setLoading(true)
      const response = await axios.post('auth/register', values, {withCredentials: true});
      if (response.status === 201) {
        message.success('Created account');
        navigate('/')
      }
    } catch (error: any) {
      setLoading(false)
      message.error(error.response.data.message);
    }
  }

  return (
    <main id='register'>
      <header>
        <img src={background} alt='login side' />
      </header>
      <section>
        <div className='header'>
          <h3>Sign up</h3>
          <p>By continuing, you are setting up a Reddit account and agree to our <a href='https://www.redditinc.com/policies/user-agreement'>User Agreement</a> and <a href='https://www.reddit.com/policies/privacy-policy'>Privacy Policy</a>.</p>
        </div>
        <div className='register-container'>
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
          <div className='register-form'>
            {loading ? <Spin tip="Loading" size="large" /> :
              <Form
                name="normal-register"
                className="register-form"
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
                  <Input prefix={<MailOutlined />} placeholder="Email" style={{
                    width: '100%',
                    padding: '0.5rem',
                    height: 'auto'
                  }} />
                </Form.Item>
                <Form.Item
                  name="username"
                  rules={UsernameSchema}
                  hasFeedback
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" style={{
                    width: '100%',
                    padding: '0.5rem',
                    height: 'auto'
                  }} />
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
                      height: 'auto'
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Confirm Password"
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      height: 'auto'
                    }}
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
                    sign up
                  </Button>
                </Form.Item>
                <p>Already a redditor? <Link to="/login" className='signUpBtn'>Log in</Link></p>
              </Form>}
          </div>
        </div>
      </section>
    </main>
  )
}

export default RegisterPage;