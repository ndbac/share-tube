import * as yup from "yup";

export interface ILoginPayload {
  email: string;
  password: string;
}

export const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});