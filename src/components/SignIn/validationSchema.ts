import * as yup from 'yup';

const minPasswordLength = 6;

export default yup.object().shape({
  email: yup.string().email('must be valid email').required(),
  password: yup.string().min(minPasswordLength, 'password is not long enough').required()
});
