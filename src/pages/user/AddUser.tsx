import { Button, Divider, Upload, type UploadFile } from "antd";
import './../../assets/css/style.css';
import { CheckboxInput, DropDownInput, EmailTextInput, MultipleDropdownInput} from "../../components/form/FormInput";
import { CategoryDTO, type ICategoryData } from "./Categoryvalidator";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BarsOutlined, FileAddOutlined, UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import categoryService from "../../services/category.service";
import brandService from "../../services/brand.service";

const AddCategory = () => {
    const navigate = useNavigate();

    // Placeholder: fetch these from your backend
    const [categories, setCategories] = useState<{ value: string, label: string }[]>([]);
    const [brands, setBrands] = useState<{ value: string, label: string }[]>([]);

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

    const { control, setValue, handleSubmit, setError, formState: { isLoading, isSubmitting } } = useForm<ICategoryData>({
        defaultValues: {
            icon: '',
            name: '',
            status: '',
            parentId: '',
            brands: [], // <-- should be an array
            showInMenu: false,
            homeFeature: false,
        } as unknown as ICategoryData,
         //eslint-disable-next-line
        resolver: yupResolver(CategoryDTO) as any
    });
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const status = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];

    const submitForm = async (data: ICategoryData) => {
        try {
            await categoryService.createCategory(data);
            toast.success('Category added successfully!', {
                description: 'Your new Category has been successfully added to the inventory.',
            });
            navigate('/admin/category');
             //eslint-disable-next-line
        } catch (exception: any) {
            if (exception.error) {
                Object.keys(exception.error).map((field) => {
                    setError(field as keyof ICategoryData, {
                        message: exception.error[field],
                    });
                });
            }
            toast.warning('Failed to add Category:', {
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
                    <h2 className="text-2xl font-poppins! font-semibold">Add Category</h2>
                    <Divider />
                </div>
                <div className="sm:mx-auto w-full rounded-md sm:max-w-lg bg-white p-8 shadfont-mediumded-lg mt-10">
                    <h2 className="mb-7 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">Add new Category to your inventory</h2>
                    <form className="space-y-7!" onSubmit={handleSubmit(submitForm)} action="#" method="POST">
                        <EmailTextInput
                            name="name"
                            control={control}
                            label="Name"
                            placeholder="Enter category name"
                            startAdornmentIcon={<BarsOutlined />}
                        />
                        <DropDownInput
                            name="parentId"
                            control={control}
                            label="Main Category"
                            options={categories}
                        />
                        <MultipleDropdownInput
                            name="brands"
                            control={control}
                            label="Choose brands"
                            options={brands}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <CheckboxInput
                                name="showInMenu"
                                control={control}
                                label="Show In Menu"
                            />
                            <CheckboxInput
                                name="homeFeature"
                                control={control}
                                label="Home Featured"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Upload
                                name="icon"
                                listType="picture"
                                defaultFileList={[] as UploadFile[]}
                                fileList={fileList}
                                onChange={({ fileList: newFileList }) => {
                                    setFileList(newFileList);
                                    if (newFileList.length > 0 && newFileList[0].originFileObj) {
                                        setValue("icon", newFileList[0].originFileObj);
                                    } else {
                                        setValue("icon", '');
                                    }
                                }}
                                beforeUpload={() => false}
                            >
                                <Button type="primary"
                                    icon={<UploadOutlined />}
                                    className="bg-indigo-600! hover:bg-indigo-500! text-white"
                                    style={{
                                        width: '200px',
                                        height: '42px',
                                        fontFamily: 'Poppins, sans-serif',
                                    }}
                                > Upload Icon</Button>
                            </Upload>
                            <DropDownInput
                                name="status"
                                label="Status"
                                control={control}
                                options={status}
                                 //eslint-disable-next-line
                                onChange={(event: any, field: any) => {
                                    event.preventDefault();
                                    event.nativeEvent?.stopImmediatePropagation();
                                    field.onChange(event);
                                }}
                            />
                        </div>
                        <div>
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
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default AddCategory;