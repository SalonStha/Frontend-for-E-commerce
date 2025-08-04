import * as yup from 'yup';

export interface IBannerData {
    _id: string;
    title: string;
    status: string;
    link: string;
    image: File | string | null; // Assuming logo can be a File object or a string URL
    actions?: React.ReactNode; // Optional actions like edit/delete buttons
}

export const BannerDTO = yup.object().shape({
    title: yup.string().required('Banner title is required'),
    status: yup.string().required('Status is required'),
    link: yup.string().optional().nullable(),
    image: yup.mixed().required('Image is required'),
});

export const UpdateBannerDTO = yup.object().shape({
    title: yup.string().required('Banner title is required'),
    status: yup.string().required('Status is required'),
    link: yup.string().optional().nullable(),
    image: yup.mixed().optional().nullable(),
});
