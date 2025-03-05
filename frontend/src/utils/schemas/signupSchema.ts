import * as yup from 'yup';

export const signupSchema = yup.object().shape({
    displayName: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
    email: yup.string().email('Email address is invalid').required('Email is required'),
    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase character')
        .matches(/[a-z]/, 'Password must contain at least one lowercase character')
        .matches(/[0-9]/, 'Password must contain at least one numeric character')
        .matches(/[@$!%*?&#]/, 'Password must contain at least one special character. @$!%*?&#'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'),
});