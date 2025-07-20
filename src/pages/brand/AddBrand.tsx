import { Button, Divider, Upload, type UploadFile } from "antd";
import './../../assets/css/style.css';
import { DropDownInput, EmailTextInput } from "../../components/form/FormInput";
import { BrandDTO, type IBrandData } from "./Brandvalidator";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BarsOutlined, FileAddOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import brandService from "../../services/brand.service";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const AddBrand = () => {
    const navigate = useNavigate();

    const { control, setValue, handleSubmit, setError, formState: { isLoading, isSubmitting } } = useForm<IBrandData>({
        defaultValues: {
            logo: '',
            name: '',
            status: '',
        } as IBrandData,
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        resolver: yupResolver(BrandDTO) as any // Using yup for validation schema
    });
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const status = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];

    const submitForm = async (data: IBrandData) => {
        try {
            await brandService.createBrand(data);
            toast.success('Brand added successfully!', {
                description: 'Your new brand has been successfully added to the inventory.',
            });
            navigate('/admin/brands');

            //eslint-disable-next-line
        } catch (exception: any) {
            if (exception.error) {
                Object.keys(exception.error).map((field) => {
                    setError(field as keyof IBrandData, {
                        message: exception.error[field],
                    });
                });
            }
            toast.warning('Failed to add brand:', {
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
                    <h2 className="text-2xl font-poppins! font-semibold">Add brand</h2>
                    <Divider />
                </div>
                <div className="sm:mx-auto w-full rounded-md sm:max-w-lg bg-white p-8 shadfont-mediumded-lg mt-10">
                    <h2 className="mb-7 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">Add new brand to your inventory</h2>
                    <form className="space-y-7!" onSubmit={handleSubmit(submitForm)} action="#" method="POST">
                        <EmailTextInput
                            name="name"
                            control={control}
                            label="Name"
                            placeholder="Enter brand name"
                            startAdornmentIcon={<BarsOutlined />}
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
                                        setValue("logo", newFileList[0].originFileObj);
                                    } else {
                                        setValue("logo", '');
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

export default AddBrand;