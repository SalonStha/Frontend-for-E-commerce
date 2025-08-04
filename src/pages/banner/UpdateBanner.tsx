import { Button, Divider } from "antd";
import './../../assets/css/style.css';
import { DropDownInput, EmailTextInput, ImageUploadInput } from "../../components/form/FormInput";
import { UpdateBannerDTO, type IBannerData } from "./BannerValidator";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BarsOutlined, CloudUploadOutlined, LinkOutlined,} from "@ant-design/icons";
import { useState, useEffect } from "react";
import bannerService from "../../services/banner.service";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";

const UpdateBanner = () => {
    const navigate = useNavigate();

    const params = useParams();

    const [image, setImage] = useState<string>('https://via.placeholder.com/150');
    const [imageName, setImageName] = useState<string>('');
    const [hadImage, setHadImage] = useState(false);
    const [imageMode, setImageMode] = useState<'existing' | 'new' | 'removed'>('existing');
    const [loading, setLoading] = useState(false);


    const { control, setValue, handleSubmit, setError, formState: { isLoading, isSubmitting } } = useForm<IBannerData>({
        defaultValues: {
            title: '',
            link: '',
            image: '',
            status: '',
        } as IBannerData,
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: yupResolver(UpdateBannerDTO) as any // Using yup for validation schema
    });
    const status = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];


    const submitForm = async (data: IBannerData) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('link', data.link);
        formData.append('status', data.status);

        // If image is a File, append it. If it's a string (URL), do nothing (keep old image).
        if (data.image && typeof data.image !== 'string') {
            formData.append('image', data.image);
        }
        // Only send removeLogo if the banner originally had a image and the user removed it
        if (hadImage && imageMode === 'removed') {
            formData.append('removeImage', 'true');
        }

        try {
            await bannerService.putRequest('banner/' + params.id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Banner updated successfully!', {
                description: 'Your new banner has been successfully updated to the inventory.',
            });
            navigate('/admin/banners');
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (exception: any) {
            const err = exception as { error?: Record<string, string> };
            if (err.error) {
                Object.keys(err.error).map((field) => {
                    setError(field as keyof IBannerData, {
                        message: err.error![field],
                    });
                });
            }
            toast.warning("Failed to update banner", {
                description: "An error occurred while updating the banner. Please try again."
            });
        } finally {
            setLoading(false);
        }
    };

    const getBanner = async () => {
        try {
            const response = await bannerService.getRequest('banner/' + params.id);
            console.log(response);
            setValue('title', response.data.title);
            setValue('link', response.data.link);
            setValue('status', response.data.status);
            if (response.data.image && response.data.image.optimizedUrl) {
                setImage(response.data.image.optimizedUrl);
                setImageName(response.data.title);
                setValue('image', null); // Do not set the URL as the value
                setHadImage(true);
                setImageMode('existing');
            } else {
                setImage('https://via.placeholder.com/150');
                setImageName('no-image');
                setValue('image', null);
                setHadImage(false);
                setImageMode('existing');
            }
           
        } catch {
            toast.error('Failed to fetch banner details');
        }
    }

    useEffect(() => {
        getBanner();
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
                        <span style={{ fontSize: 20, color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>Updating banner...</span>
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
                    <h2 className="text-2xl font-poppins! font-semibold">Update banner</h2>
                    <Divider />
                </div>
                <div className="sm:mx-auto w-full rounded-md sm:max-w-lg bg-white p-8 shadfont-mediumded-lg mt-10">
                    <h2 className="mb-7 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">Update banner for your inventory</h2>
                    <form className="space-y-7!" onSubmit={handleSubmit(submitForm)} action="#" method="POST">
                    <EmailTextInput
                            name="title"
                            control={control}
                            label="Title"
                            placeholder="Enter banner title"
                            startAdornmentIcon={<BarsOutlined />}
                        />
                        <EmailTextInput
                            name="link"
                            control={control}
                            label="Link"
                            placeholder="Enter banner link"
                            startAdornmentIcon={<LinkOutlined />}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ImageUploadInput
                                    name="logo"
                                    control={control}
                                    setValue={setValue}
                                    toast={toast}
                                    defaultUrl={image}
                                    defaultName={imageName}
                                    label="Logo"
                                    setLogo={setImage}
                                    setLogoMode={setImageMode}
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

export default UpdateBanner;