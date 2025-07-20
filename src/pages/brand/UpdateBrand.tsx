import { Button, Divider } from "antd";
import './../../assets/css/style.css';
import { DropDownInput, EmailTextInput, ImageUploadInput } from "../../components/form/FormInput";
import { UpdateBrandDTO, type IBrandData } from "./Brandvalidator";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BarsOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import brandService from "../../services/brand.service";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";

const UpdateBrand = () => {
    const navigate = useNavigate();

    const params = useParams();

    const [logo, setLogo] = useState<string>('https://via.placeholder.com/150');
    const [logoName, setLogoName] = useState<string>('');
    const [hadLogo, setHadLogo] = useState(false);
    const [logoMode, setLogoMode] = useState<'existing' | 'new' | 'removed'>('existing');
    const [loading, setLoading] = useState(false);


    const { control, setValue, handleSubmit, setError, formState: { isLoading, isSubmitting } } = useForm<IBrandData>({
        defaultValues: {
            logo: '',
            name: '',
            status: '',
        } as IBrandData,
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: yupResolver(UpdateBrandDTO) as any // Using yup for validation schema
    });

    const status = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];


    const submitForm = async (data: IBrandData) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('status', data.status);

        // If logo is a File, append it. If it's a string (URL), do nothing (keep old logo).
        if (data.logo && typeof data.logo !== 'string') {
            formData.append('logo', data.logo);
        }
        // Only send removeLogo if the brand originally had a logo and the user removed it
        if (hadLogo && logoMode === 'removed') {
            formData.append('removeLogo', 'true');
        }

        try {
            await brandService.putRequest('brands/' + params.id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Brand updated successfully!', {
                description: 'Your new brand has been successfully updated to the inventory.',
            });
            navigate('/admin/brands');
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (exception: any) {
            const err = exception as { error?: Record<string, string> };
            if (err.error) {
                Object.keys(err.error).map((field) => {
                    setError(field as keyof IBrandData, {
                        message: err.error![field],
                    });
                });
            }
            toast.warning("Failed to update brand", {
                description: "An error occurred while updating the brand. Please try again."
            });
        } finally {
            setLoading(false);
        }
    };

    const getBrand = async () => {
        try {
            const response = await brandService.getRequest('brands/' + params.id);
            console.log(response);
            setValue('name', response.data.name);
            setValue('status', response.data.status);
            if (response.data.logo && response.data.logo.optimizedUrl) {
                setLogo(response.data.logo.optimizedUrl);
                setLogoName(response.data.name);
                setValue('logo', null); // Do not set the URL as the value
                setHadLogo(true);
                setLogoMode('existing');
            } else {
                setLogo('https://via.placeholder.com/150');
                setLogoName('no-logo');
                setValue('logo', null);
                setHadLogo(false);
                setLogoMode('existing');
            }
           
        } catch {
            toast.error('Failed to fetch brand details');
        }
    }

    useEffect(() => {
        getBrand();
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
                    <h2 className="text-2xl font-poppins! font-semibold">Update brand</h2>
                    <Divider />
                </div>
                <div className="sm:mx-auto w-full rounded-md sm:max-w-lg bg-white p-8 shadfont-mediumded-lg mt-10">
                    <h2 className="mb-7 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">Update brand for your inventory</h2>
                    <form className="space-y-7!" onSubmit={handleSubmit(submitForm)} action="#" method="POST">
                        <EmailTextInput
                            name="name"
                            control={control}
                            label="Name"
                            placeholder="Enter brand name"
                            startAdornmentIcon={<BarsOutlined />}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <ImageUploadInput
                                    name="logo"
                                    control={control}
                                    setValue={setValue}
                                    toast={toast}
                                    defaultUrl={logo}
                                    defaultName={logoName}
                                    label="Logo"
                                    setLogo={setLogo}
                                    setLogoMode={setLogoMode}
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

export default UpdateBrand;