import * as yup from 'yup';

export interface IUserData {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: File | string | null; // Assuming logo can be a File object or a string URL
    phoneNumber: string;
    role: string;
    status: string;
    dob: Date | string | null;
    gender: string;
    address: {
     billingAddress: string;
     shippingAddress: string;
    }
    actions?: React.ReactNode; // Optional actions like edit/delete buttons
}

export const CategoryDTO = yup.object().shape({
    name: yup.string().required('Category name is required'),
    status: yup.string().required('Status is required'),
    icon: yup.mixed().required('Logo is required'),
    parentId: yup.string().optional().nullable(),
    brands: yup.array().of(yup.string()).required('Brand is required'),
    showInMenu: yup.boolean().optional().nullable(),
    homeFeature: yup.boolean().optional().nullable(),
});

export const UpdateCategoryDTO = yup.object().shape({
    name: yup.string().required('Category name is required'),
    status: yup.string().required('Status is required'),
    icon: yup.mixed().optional().nullable(),
    parentId: yup.string().optional().nullable(),
    brands: yup.array().of(yup.string()).required('Brand is required'),
    showInMenu: yup.boolean().optional().nullable(),
    homeFeature: yup.boolean().optional().nullable(),
});
