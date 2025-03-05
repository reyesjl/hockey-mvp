import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().email('Email address is invalid').required('Email is required'),
    password: yup.string().required('Password is required'),
});