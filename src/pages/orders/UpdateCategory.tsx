import { Button, Divider } from "antd";
import './../../assets/css/style.css';
import { DropDownInput, EmailTextInput, ImageUploadInput, MultipleDropdownInput } from "../../components/form/FormInput";
import { UpdateCategoryDTO, type ICategoryData } from "./Categoryvalidator";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BarsOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import categoryService from "../../services/category.service";
import brandService from "../../services/brand.service";

const UpdateCategory = () => {

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
    const navigate = useNavigate();

    const params = useParams();

    const [icon, seticon] = useState<string>('https://via.placeholder.com/150');
    const [iconName, seticonName] = useState<string>('');
    const [hadicon, setHadicon] = useState(false);
    const [iconMode, seticonMode] = useState<'existing' | 'new' | 'removed'>('existing');
    const [loading, setLoading] = useState(false);


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
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: yupResolver(UpdateCategoryDTO) as any // Using yup for validation schema
    });

    const status = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];


    const submitForm = async (data: ICategoryData) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('status', data.status);
        formData.append('parentId', data.parentId);
        if (Array.isArray(data.brands)) {
            //eslint-disable-next-line 
            data.brands.forEach((b: any) => {
              formData.append('brands', typeof b === 'string' ? b : b.value);
            });
          } else {
            formData.append('brands', '');
          }
        formData.append('showInMenu', data.showInMenu ? 'true' : 'false');
        formData.append('homeFeature', data.homeFeature ? 'true' : 'false')

        // If icon is a File, append it. If it's a string (URL), do nothing (keep old icon).
        if (data.icon && typeof data.icon !== 'string') {
            formData.append('icon', data.icon);
        }
        // Only send removeicon if the brand originally had a icon and the user removed it
        if (hadicon && iconMode === 'removed') {
            formData.append('removeicon', 'true');
        }
        try {
            await categoryService.putRequest('category/' + params.id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Category updated successfully!', {
                description: 'Your new category has been successfully updated to the inventory.',
            });
            navigate('/admin/category');
            //eslint-disable-next-line 
        } catch (exception: any) {
            const err = exception as { error?: Record<string, string> };
            if (err.error) {
                Object.keys(err.error).map((field) => {
                    setError(field as keyof ICategoryData, {
                        message: err.error![field],
                    });
                });
            }
            toast.warning("Failed to update category", {
                description: "An error occurred while updating the category. Please try again."
            });
        } finally {
            setLoading(false);
        }
    };

    const getCategory = async () => {
        try {
            const response = await categoryService.getRequest('category/' + params.id);
            console.log(response);
            setValue('name', response.data.name);
            setValue('status', response.data.status);
            setValue('parentId', response.data.parentId);
            setValue('showInMenu', response.data.showInMenu);
            setValue('homeFeature', response.data.homeFeature);
            setValue('brands', Array.isArray(response.data.brands) ? response.data.brands : []);

            if (response.data.icon && response.data.icon.optimizedUrl) {
                seticon(response.data.icon.optimizedUrl);
                seticonName(response.data.name);
                setValue('icon', null); // Do not set the URL as the value
                setHadicon(true);
                seticonMode('existing');
            } else {
                seticon('https://via.placeholder.com/150');
                seticonName('no-icon');
                setValue('icon', null);
                setHadicon(false);
                seticonMode('existing');
            }

        } catch {
            toast.error('Failed to fetch category details');
        }
    }

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <>
            {loading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(30, 41, 59, 0.75)', // much darker
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px',
                    }}>
                        <div className="dual-ring-spinner" style={{ width: 64, height: 64 }} />
                        <span style={{ fontSize: 20, color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>Updating brand...</span>
                    </div>
                    <style>{`
                        .dual-ring-spinner {
                            display: inline-block;
                            width: 64px;
                            height: 64px;
                        }
                        .dual-ring-spinner:after {
                            content: " ";
                            display: block;
                            width: 48px;
                            height: 48px;
                            margin: 8px;
                            border-radius: 50%;
                            border: 6px solid #6366f1;
                            border-color: #6366f1 transparent #22d3ee transparent;
                            animation: dual-ring-spin 1.2s linear infinite;
                        }
                        @keyframes dual-ring-spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            )}
            <div className="p-7 flex flex-col" style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#333',
            }}>
                <div className="flex flex-col">
                    <h2 className="text-2xl font-poppins! font-semibold">Update Category</h2>
                    <Divider />
                </div>
                <div className="sm:mx-auto w-full rounded-md sm:max-w-lg bg-white p-8 shadfont-mediumded-lg mt-10">
                    <h2 className="mb-7 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">Update category for your inventory</h2>
                    <form className="space-y-7!" onSubmit={handleSubmit(submitForm)} action="#" method="POST">
                        <EmailTextInput
                            name="name"
                            control={control}
                            label="Name"
                            placeholder="Enter brand name"
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
                            <ImageUploadInput
                                name="icon"
                                control={control}
                                setValue={setValue}
                                toast={toast}
                                defaultUrl={icon}
                                defaultName={iconName}
                                label="icon"
                                seticon={seticon}
                                seticonMode={seticonMode}
                            />
                            <DropDownInput
                                name="status"
                                label="Status"
                                control={control}
                                options={status}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onChange={(event: any, field: any) => {
                                    event.preventDefault();
                                    event.nativeEvent?.stopImmediatePropagation();
                                    field.onChange(event);
                                }}
                            />
                        </div>
                        <div>
                            <Button type="primary"
                                icon={<CloudUploadOutlined />}
                                htmlType="submit"
                                disabled={isSubmitting}
                                loading={isLoading}
                                className="w-full bg-indigo-600! hover:bg-indigo-700! drop-shadow-lg text-white disabled:bg-gray-500! disabled:text-gray-300! cursor-progress"
                                style={{
                                    height: '40px',
                                    fontFamily: 'Poppins, sans-serif',
                                }}
                            >
                                UPDATE
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default UpdateCategory;