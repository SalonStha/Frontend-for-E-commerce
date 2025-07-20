import * as yup from 'yup';
import { Gender, UserRoles } from '../../config/constant';

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
    role: UserRoles | '';
    gender: Gender | '';
    phoneNumber: string;
    address: {
        billingAddress: string;
        shippingAddress: string;
    }
    dob?: Date | null;
    image: File | '';
}
// Accepts: +977 980-0000000, +9779800000000, 9800000000, 980-0000000, etc.
const phoneRegex = /^(\+977[-\s]?)?(98|97|96|90)\d{1}[-\s]?\d{3}[-\s]?\d{4}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_|?])[A-Za-z\d!@#$%^&*_|?]{8,20}$/

export const RegisterFormDTO = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().nullable().optional(),
    email: yup.string().email('Invalid email address').required('Email cannot be empty'),
    password: yup.string().matches(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character').required('Password cannot be empty'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password cannot be empty'),
    role: yup.string().nullable().optional().oneOf(Object.values(UserRoles), 'Select a role'),
    gender: yup.string().required('Select a gender'),
    phoneNumber: yup.string().required('Phone number is required').matches(phoneRegex, 'Phone number must be a valid Nepali mobile number'),
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

export interface IResetPasswordForm {
    password: string;
    confirmPassword: string;
}

export const ResetPasswordFormDTO = yup.object().shape({
    password: yup.string().matches(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character').required('Password cannot be empty'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password cannot be empty'),
});



