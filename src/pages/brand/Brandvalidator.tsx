import * as yup from 'yup';

export interface IBrandData {
    _id: string;
    name: string;
    status: string;
    logo: File | string | null; // Assuming logo can be a File object or a string URL
    actions?: React.ReactNode; // Optional actions like edit/delete buttons
}

export const BrandDTO = yup.object().shape({
    name: yup.string().required('Brand name is required'),
    status: yup.string().required('Status is required'),
    logo: yup.mixed().required('Logo is required'),
});

export const UpdateBrandDTO = yup.object().shape({
    name: yup.string().required('Brand name is required'),
    status: yup.string().required('Status is required'),
    logo: yup.mixed().optional().nullable(),
});
