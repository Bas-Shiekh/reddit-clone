const EmailSchema = [
  { required: true, message: 'Please input your Email!' },
  { whitespace: true },
]

const UsernameSchema = [
  { required: true, message: 'Please input your Username!' },
  { min: 3, message: 'Username must be at least 3 characters' },
  { max: 30, message: 'Username cannot be longer than 30 characters' },
  { whitespace: true },
]

const PasswordSchema = [
  { required: true, message: 'Please input your Email!' },
  { min: 8, message: 'Password must be at least 8 characters' },
  { max: 30, message: 'Password cannot be longer than 30 characters' },
  { whitespace: true }, 
]

export {
  EmailSchema,
  PasswordSchema,
  UsernameSchema
}