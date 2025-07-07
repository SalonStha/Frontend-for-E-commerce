import * as yup from 'yup';

export interface ICredentials {
    email: string;
    password: string;
}
export const CredentialsDTO = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email cannot be empty'),
    password: yup.string().required('Password cannot be empty'),
});

export interface IRegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    gender: string;
    phoneNumber: string;
    address: {
        billingAddress: string;
        shippingAddress: string;
    }
    dob: null;
    image: null;
}

export const RegisterFormDTO = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().nullable().optional(),
    email: yup.string().email('Invalid email address').required('Email cannot be empty'),
    password: yup.string().required('Password cannot be empty'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password cannot be empty'),
    role: yup.string().nullable().optional(),
    gender: yup.string().required('Gender is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    address: yup.object().shape({
        billingAddress: yup.string().nullable().optional(),
        shippingAddress: yup.string().required('Shipping address is required'),
    }),
    dob: yup.date().nullable().optional(),
    image: yup.mixed().nullable().optional(),
});

export interface IForgotPasswordForm {
    email: string;
}

export const ForgotPasswordFormDTO = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email cannot be empty'),
});



