import * as yup from 'yup';

export interface IProductData {
    _id: string;
    name: string;
    description: string;
    price: number;
    discount?: number;
    category: string[];
    tags: string[];
    stock: string;
    brand?:string;
    attributes:string[];
    sku:string;
    homeFeature: boolean;
    status: string;
    images?: File | string | null; // Assuming logo can be a File object or a string URL
    actions?: React.ReactNode; // Optional actions like edit/delete buttons
}

export const ProductDTO = yup.object().shape({
    name: yup.string().required('Product name is required'),
    description: yup.string().required('A short description is required'),
    price: yup.number().required('Price is required'),
    discount: yup.string().optional().nullable(),
    category: yup.array().of(yup.string()).required('Category is required'),
    tags: yup.array().of(yup.string()).optional().nullable(),
    stock: yup.string().required('Stock is required'),
    brand: yup.string(),
    attributes: yup.array().of(yup.string()).optional().nullable(),
    sku: yup.string().required().optional().nullable(),
    status: yup.string().required('Status is required'),
    images: yup.mixed().required('Image is required'),
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
