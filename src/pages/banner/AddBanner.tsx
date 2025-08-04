import { Button, Divider, Upload, type UploadFile } from "antd";
import './../../assets/css/style.css';
import { DropDownInput, EmailTextInput } from "../../components/form/FormInput";
import { BannerDTO, type IBannerData } from "./BannerValidator";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BarsOutlined, FileAddOutlined, LinkOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import bannerService from "../../services/banner.service";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const AddBanner = () => {
    const navigate = useNavigate();

    const [loading , setLoading] = useState<boolean>(false);
    const { control, setValue, handleSubmit, setError, formState: { isLoading, isSubmitting } } = useForm<IBannerData>({
        defaultValues: {
            image: '',
            title: '',
            link: '',
            status: '',
        } as IBannerData,
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: yupResolver(BannerDTO) as any // Using yup for validation schema
    });
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const status = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];

    const submitForm = async (data: IBannerData) => {
        setLoading(true);
        try {
            await bannerService.createBanner(data);
            toast.success('Banner added successfully!', {
            description: 'Your new banner has been successfully added to the inventory.',
            });
            navigate('/admin/banners');
            //eslint-disable-next-line
        } catch (exception: any) {
            if (exception.error) {
                Object.keys(exception.error).map((field) => {
                    setError(field as keyof IBannerData, {
                        message: exception.error[field],
                    });
                });
            }
            toast.warning('Failed to add banner:', {
                description: 'An error occurred while adding the banner. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

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
                    <h2 className="text-2xl font-poppins! font-semibold">Add banner</h2>
                    <Divider />
                </div>
                <div className="sm:mx-auto w-full rounded-md sm:max-w-lg bg-white p-8 shadfont-mediumded-lg mt-10">
                    <h2 className="mb-7 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">Add new banner to your inventory</h2>
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
                            <Upload
                                name="image"
                                action=""
                                listType="picture"
                                defaultFileList={[] as UploadFile[]}
                                fileList={fileList}
                                onChange={({ fileList: newFileList }) => {
                                    setFileList(newFileList);
                                    if (newFileList.length > 0 && newFileList[0].originFileObj) {
                                        setValue("image", newFileList[0].originFileObj);
                                    } else {
                                        setValue("image", '');
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
                                > Upload Image</Button>
                            </Upload>
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

export default AddBanner;