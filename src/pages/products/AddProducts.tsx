import { Breadcrumb, Button, message, Steps, theme, Upload, type UploadFile } from "antd";
import './../../assets/css/style.css';
import { CheckboxInput, DropDownInput, EmailTextInput, MultipleDropdownInput, TagInput } from "../../components/form/FormInput";
import { ProductDTO, type IProductData } from "./ProductValidator";
import { useForm } from "react-hook-form";
import { AppstoreAddOutlined, BarsOutlined, BgColorsOutlined, DollarCircleFilled, DollarCircleTwoTone, DoubleLeftOutlined, HomeFilled, ProductFilled, ProductOutlined, UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import productService from "../../services/product.service";
import brandService from "../../services/brand.service";
import categoryService from "../../services/category.service";
import { Divider } from "@mui/material";
import * as yup from 'yup';


const AddProduct = () => {
    const navigate = useNavigate();

    // Placeholder: fetch these from your backend
    const [categories, setCategories] = useState<{ value: string, label: string }[]>([]);
    const [brands, setBrands] = useState<{ value: string, label: string }[]>([]);

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const status = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];
    
    // Define validation schemas for each step
    const stepValidationSchemas = [
        // Step 1: Basic Information
        yup.object().shape({
            name: yup.string().required('Product name is required'),
            description: yup.string().required('Product description is required'),
            category: yup.array().min(1, 'At least one category is required').required('Category is required'),
            brand: yup.string()
        }),
        // Step 2: Price and Stock
        yup.object().shape({
            price: yup.number().required('Price is required').typeError('Price should be a number'),
            stock: yup.string().required('Stock is required'),
            sku: yup.string().required('SKU is required'),
        }),
        // Step 3: Miscellaneous Information
        yup.object().shape({
            status: yup.string().required('Status is required'),
            images: yup.mixed().required('At least one image is required').typeError('Images should be a file'),
            color: yup.array().optional().nullable(),
            tags: yup.array().optional().nullable(),
            homeFeature: yup.boolean().optional().nullable(),
        }),
    ];
    
    const { control, setValue, handleSubmit, setError, formState: { isLoading, isSubmitting }, getValues, clearErrors } = useForm<IProductData>({
        defaultValues: {
            name: '',
            description: '',
            price: '',
            discount: '',
            category: [],
            tags: [],
            stock: '',
            brand: '',
            attributes: [],
            sku: '',
            homeFeature: true,
            status: '',
            images: '',
        } as unknown as IProductData,
        mode: 'onChange'
        // Remove the global resolver to handle validation per step
    })

    const steps = [
        {
            title: 'Basic Information',
            content:
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <EmailTextInput
                        name="name"
                        control={control}
                        label="Name"
                        placeholder="Enter product name"
                        startAdornmentIcon={<ProductOutlined />}
                    />
                    <EmailTextInput
                        name="description"
                        control={control}
                        label="Description"
                        placeholder="Enter product description"
                        startAdornmentIcon={<BarsOutlined />}
                        rows={4}
                    />
                    <MultipleDropdownInput
                        name="category"
                        control={control}
                        label="Choose categories"
                        options={categories}
                    />
                    <DropDownInput
                        name="brand"
                        control={control}
                        label="Choose brand"
                        options={brands}
                    />
                </div>
        },
        {
            title: 'Price and Stock',
            content:
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    <EmailTextInput
                        name="price"
                        control={control}
                        label="Price"
                        type="number"
                        placeholder="Enter product price"
                        startAdornmentIcon={<DollarCircleTwoTone />}
                    />
                    <EmailTextInput
                        name="discount"
                        control={control}
                        label="Discount (If any)"
                        type="number"
                        placeholder="Enter discount in percent"
                        startAdornmentIcon={<ProductOutlined />}
                    />
                    <EmailTextInput
                        name="stock"
                        control={control}
                        label="Stock"
                        placeholder="Enter inventory stock"
                        startAdornmentIcon={<ProductOutlined />}
                    />
                    <EmailTextInput
                        name="sku"
                        control={control}
                        label="SKU"
                        placeholder="Enter SKU of the product"
                        startAdornmentIcon={<ProductOutlined />}
                    />
                </div>
        },
        {
            title: 'Miscellaneous Information',
            content: <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <TagInput
                    name="color"
                    control={control}
                    label="Color (If any)"
                    startAdornmentIcon={<BgColorsOutlined />}
                />
                <TagInput
                    name="tags"
                    control={control}
                    label="Tags (If any)"
                    helperText="Prese enter to add tags"
                />
                <DropDownInput
                    name="status"
                    label="Status"
                    control={control}
                    options={status}
                />
                <Upload
                    name="images"
                    listType="picture"
                    defaultFileList={[] as UploadFile[]}
                    fileList={fileList}
                    onChange={({ fileList: newFileList }) => {
                        setFileList(newFileList);
                        if (newFileList.length > 0 && newFileList[0].originFileObj) {
                            setValue("images", newFileList[0].originFileObj);
                        } else {
                            setValue("images", null);
                        }
                    }}
                    beforeUpload={() => false}
                >
                    <Button type="primary"
                        icon={<UploadOutlined />}
                        className="bg-indigo-600! hover:bg-indigo-500! text-white"
                        style={{
                            width: '41.5vh',
                            height: '42px',
                            fontFamily: 'Poppins, sans-serif',
                        }}
                    > Upload Images</Button>
                </Upload>
                <CheckboxInput
                    name="homeFeature"
                    control={control}
                    label="Home Featured"
                />
            </div>
        },
    ];

    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const validateCurrentStep = async () => {
        try {
            // Clear all errors first
            clearErrors();
            
            // Get current step's field names
            const currentStepFields = getStepFields(current);
            
            // Get current values
            const currentValues = getValues();
            
            try {
                // Validate with step-specific schema
                await stepValidationSchemas[current].validate(currentValues, { abortEarly: false }); 
                
                // If validation passes, clear errors for current step fields
                currentStepFields.forEach(field => {
                    clearErrors(field);
                });
                
                return true;
            } catch (validationError) {
                // Set errors only for current step fields
                if ((validationError as yup.ValidationError).inner) {
                    (validationError as yup.ValidationError).inner.forEach((error) => {
                        if (currentStepFields.includes(error.path as keyof IProductData)) {
                            setError(error.path as keyof IProductData, {
                                message: error.message,
                            });
                        }
                    });
                }
                return false;
            }
        } catch (error) {
            console.error('Validation error:', error);
            return false;
        }
    };
    
    const getStepFields = (stepIndex: number): (keyof IProductData)[] => {
        switch (stepIndex) {
            case 0:
                return ['name', 'description', 'category', 'brand'];
            case 1:
                return ['price', 'discount', 'stock', 'sku'];
            case 2:
                return ['status', 'images', 'tags', 'homeFeature'];
            default:
                return [];
        }
    };

    const next = async () => {
        const isValid = await validateCurrentStep();
        if (isValid) {
            setCurrent(current + 1);
        } else {
            toast.error('Please fill the fields before proceeding to the next step');
        }
    };

    const prev = () => {
        // Clear errors when going back
        const currentStepFields = getStepFields(current);
        currentStepFields.forEach(field => {
            clearErrors(field);
        });
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const contentStyle: React.CSSProperties = {
        color: token.colorTextTertiary,
        marginTop: 16,
        paddingTop:25,
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryService.getRequest('/category'); // Adjust this to your actual service method
                // Map the response to { value, label } format if needed
                //eslint-disable-next-line
                setCategories(response.data.map((cat: any) => ({
                    value: cat._id, // or cat.id, depending on your backend
                    label: cat.name,
                })));
            } catch (error) {
                console.error('Error fetching categories:', error);
                // handle error (e.g., show toast)
            }
        };

        const fetchBrands = async () => {
            try {
                const response = await brandService.getRequest('/brands');
                //eslint-disable-next-line
                setBrands(response.data.map((brand: any) => ({
                    value: brand._id,
                    label: brand.name,
                })));
            } catch (error) {
                console.error('Error fetching brands:', error);
                // handle error
            }
        };
        fetchCategories();
        fetchBrands();
    }, []);




    const submitForm = async (data: IProductData) => {
        try {
            // Clear all errors first
            clearErrors();
            
            // Validate all steps before submission
            let hasErrors = false;
            let firstErrorStep = -1;
            
            for (let i = 0; i < steps.length; i++) {
                try {
                    await stepValidationSchemas[i].validate(data, { abortEarly: false });
                } catch (validationError) {
                    hasErrors = true;
                    if (firstErrorStep === -1) {
                        firstErrorStep = i;
                    }
                    
                    // Set errors for this step
                    if ((validationError as yup.ValidationError).inner) {
                        (validationError as yup.ValidationError).inner.forEach((error) => {
                            setError(error.path as keyof IProductData, {
                                type: 'manual',
                                message: error.message,
                            });
                        });
                    }
                }
            }
            
            if (hasErrors) {
                setCurrent(firstErrorStep);
                message.error(`Please fix errors in step: ${steps[firstErrorStep].title}`);
                return;
            }
            
            // Validate with full schema before submission
            try {
                await ProductDTO.validate(data, { abortEarly: false });
            } catch (validationError) {
                if ((validationError as yup.ValidationError).inner) {
                    (validationError as yup.ValidationError).inner.forEach((error) => {
                        setError(error.path as keyof IProductData, {
                            type: 'manual',
                            message: error.message,
                        });
                    });
                }
                
                // Find which step has the error
                for (let i = 0; i < steps.length; i++) {
                    const stepFields = getStepFields(i);
                    const hasStepError = (validationError as yup.ValidationError).inner.some((error) =>
                        stepFields.includes(error.path as keyof IProductData)
                    );
                    
                    if (hasStepError) {
                        setCurrent(i);
                        message.error(`Please fix errors in step: ${steps[i].title}`);
                        return;
                    }
                }
                return;
            }
            
            const response = await productService.createProduct(data);
            console.log(data);
            console.log(response);
            toast.success('Product added successfully!', {
                description: 'Your new product has been successfully added to the inventory.',
            });
            navigate('/admin/products');
            //eslint-disable-next-line
        } catch (exception: any) {

            toast.warning('Failed to add product:', {
                description: 'An error occurred while adding the product. Please try again.',
            });
        }
    };

    return (
        <>
            <div className="p-7 flex flex-col" style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#333',
            }}>
                <div className="flex flex-col">
                    <div>
                        <h2 className="text-2xl font-poppins! font-semibold">Products</h2>
                        <Breadcrumb
                            style={{
                                margin: '10px 0',
                                fontFamily: 'Poppins, sans-serif',
                                color: '#fffff',
                                fontSize: '15px',
                                fontWeight: '500',
                            }}
                            items={[
                                {
                                    href: '/admin',
                                    title: (
                                        <>
                                            <HomeFilled />
                                            <span>Dashboard</span>
                                        </>
                                    ),
                                },
                                {
                                    href: '/admin/products',
                                    title: (
                                        <>
                                            <ProductFilled />
                                            <span>Product</span>
                                        </>
                                    ),
                                },
                                {
                                    title: (
                                        <>
                                            <AppstoreAddOutlined />
                                            <span>Add Product</span>
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </div>
                    <Divider />
                </div>
                <div className="sm:mx-auto w-full rounded-md sm:max-w-[95vh] bg-white p-8 shadfont-mediumded-lg mt-10">
                    <h2 className="mb-7 text-left text-xl font-bold leading-9 tracking-tight text-gray-900">Add new product to your inventory</h2>
                    <form className="space-y-7! overflow-y-auto max-h-[55vh] p-2" onSubmit={handleSubmit(submitForm)} action="#" method="POST">
                        <Steps current={current} items={items} />
                        <div style={contentStyle} key={current}>{steps[current].content}</div>
                        <div style={{ marginTop: 24, textAlign: 'right' }}>
                            {current > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                    Previous
                                </Button>
                            )}
                            {current < steps.length - 1 && (
                                <Button  className="bg-indigo-600! hover:bg-indigo-500! text-white" type="primary" onClick={() => next()}>
                                    Next
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button
                                    htmlType="submit"
                                    className="bg-indigo-600! hover:bg-indigo-500! text-white"
                                    type="primary"
                                    loading={isSubmitting}
                                    disabled={isLoading}
                                >
                                    Done
                                </Button>
                            )}

                        </div>

                        {/* <div>
                            <Button type="primary"
                                icon={<FileAddOutlined />}
                                htmlType="submit"
                                disabled={isSubmitting}
                                loading={isLoading}
                                className="w-full bg-indigo-600! hover:bg-indigo-700! drop-shadow-lg text-white disabled:bg-gray-500! disabled:text-gray-300! cursor-progress"
                                style={{
                                    height: '40px',
                                    fontFamily: 'Poppins, sans-serif',
                                }}
                            >
                                Add
                            </Button>
                        </div> */}
                    </form>
                </div>
            </div>
        </>
    )
};

export default AddProduct;