import * as yup from 'yup';
export interface IProductForm {
    name: string;
    description: string;
    category: string[];
    brand: string;
    price: number;
    stock: number;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    images: null | any;
    tags?: string[];
    attributes?: Record<string, string>;
    sku?: string;
    status?: string;
    homeFeatured?: boolean;
}

export const ProductValidatorDTO =  yup.object().shape({
    name: yup.string().required('Product name is required').min(3, 'Product name must be at least 3 characters long'),
    description: yup.string().required('Product description is required').min(10, 'Product description must be at least 10 characters long'),
    category: yup.string().required('Product category is required'),
    brand: yup.string().required('Product brand is required'),
    price: yup.number().required('Price is required'),
    stock: yup.number().required('Stock is required'),
    images: yup.array().of(yup.string().url('Each image must be a valid URL')).required('At least one product image is required'),
    tags: yup.array().of(yup.string()).optional(),
    attributes: yup.object().optional(),
    sku: yup.string().optional(),
    status: yup.string().optional(),
    homeFeatured: yup.boolean().optional()
});