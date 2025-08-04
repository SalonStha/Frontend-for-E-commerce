import { PasswordInput, DropDownInput, DateInput, EmailTextInput, PhoneNumberInput } from "../../components/form/FormInput";
import { useForm } from "react-hook-form";
import { RegisterFormDTO, type IRegisterForm } from "./validator";
import { Link, useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormOutlined, KeyOutlined, MailFilled, ShoppingCartOutlined, UploadOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import type { UploadFile } from 'antd';
import { useState } from "react";
import { toast } from "sonner";
import authService from "../../services/auth.service";

const SignUpPage = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, setValue, setError, formState: { isSubmitting, isLoading } } = useForm<IRegisterForm>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: '',
            address: {
                billingAddress: '',
                shippingAddress: '',
            },
            gender: '',
            dob: null,
            phoneNumber: '',
            image: '',
        } as IRegisterForm,
        // eslint-disable-next-line
        resolver: yupResolver(RegisterFormDTO) as any
    });
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const submitForm = async (data: IRegisterForm) => {
        try {
            const response = await authService.registerUser(data)
            toast.success('Successfully registered!', {
                description: response.message,
                richColors: true,
                closeButton: true,
                position: 'top-right',
                duration: 5000,
                style: {
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '15px',
                    margin: '10px',
                    padding: '20px',
                },
            });
            navigate('/');
            // eslint-disable-next-line
        } catch (exception: any) {
            console.error('Registration failed:', exception);
            if (exception.error) {
                Object.keys(exception.error).map((field) => {
                    setError(field as keyof IRegisterForm, {
                        message: exception.error[field],
                    });
                });
            }
            toast.warning('Registration failed:', {
                description: exception?.message,
            });
        }
    }

    const gender = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' },
    ];
    const role = [
        { value: 'Admin', label: 'Admin' },
        { value: 'Seller', label: 'Seller' },
        { value: 'Customer', label: 'Customer' },
    ];

    return (
        <>
            <div className="font-poppins flex w-full h-screen flex-col items-center justify-center bg-gray-200">
                <div>
                    <div className="sm:mx-auto sm:w-full rounded-md sm:max-w-[600px] bg-white p-8 shadfont-mediumded-lg">
                        <h2 className="mt-4 text-left text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
                        <p className="mt-4 mb-3 text-left text-sm text-gray-600">Fill up the form to create a new account</p>
                        <form className="space-y-6" onSubmit={handleSubmit(submitForm)} action="#" method="POST">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <EmailTextInput
                                        name="firstName"
                                        label="First Name"
                                        control={control}
                                        type="text"
                                        variant="outlined"
                                        placeholder="Enter your first name"
                                        startAdornmentIcon={<UserAddOutlined />}
                                        disabled={isSubmitting}
                                        loading={isLoading}
                                    />
                                </div>
                                <div>
                                    <EmailTextInput
                                        name="lastName"
                                        label="Last Name"
                                        control={control}
                                        type="text"
                                        placeholder="Enter your last name"
                                        startAdornmentIcon={<UserAddOutlined />}
                                        disabled={isSubmitting}
                                        loading={isLoading}
                                    />
                                </div>
                            </div>
                            <div>
                                <EmailTextInput
                                    name="email"
                                    label="Email"
                                    control={control}
                                    type="email"
                                    placeholder="Enter your email address"
                                    startAdornmentIcon={<MailFilled />}
                                    disabled={isSubmitting}
                                    loading={isLoading}
                                />
                            </div>
                            <div>
                                <PasswordInput
                                    name="password"
                                    label="Password"
                                    control={control}
                                    placeholder="Enter your password"
                                    startAdornmentIcon={<KeyOutlined />}
                                    disabled={isSubmitting}
                                    loading={isLoading}
                                />
                            </div>
                            <div>
                                <PasswordInput
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    control={control}
                                    placeholder="Confirm your password"
                                    startAdornmentIcon={<KeyOutlined />}
                                    disabled={isSubmitting}
                                    loading={isLoading}
                                />
                            </div>
                            <div>
                                <EmailTextInput
                                    name="address.shippingAddress"
                                    label="Shipping Address"
                                    control={control}
                                    type="text"
                                    placeholder="Enter your shipping address"
                                    startAdornmentIcon={<ShoppingCartOutlined />}
                                    disabled={isSubmitting}
                                    loading={isLoading}
                                />
                            </div>
                            <div>
                                <EmailTextInput
                                    name="address.billingAddress"
                                    label="Billing Address"
                                    control={control}
                                    type="text"
                                    placeholder="Enter your billing address"
                                    startAdornmentIcon={<ShoppingCartOutlined />}
                                    disabled={isSubmitting}
                                    loading={isLoading}


                                />
                            </div>
                            <div >
                                <PhoneNumberInput
                                    name="phoneNumber"
                                    label="Phone Number"
                                    control={control}
                                    type="number"
                                    disabled={isSubmitting}
                                    loading={isLoading}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <DropDownInput
                                    name="gender"
                                    label="Gender"
                                    control={control}
                                    options={gender}
                                    disabled={isSubmitting}
                                    loading={isLoading}
                                />
                                <DateInput
                                    name="dob"
                                    label="Date of Birth"
                                    control={control}
                                    disabled={isSubmitting}
                                    loading={isLoading}
                                />
                            </div>
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
                                    disabled={isSubmitting}
                                >
                                    <Button type="primary"
                                        icon={<UploadOutlined />}
                                        className="bg-indigo-600! hover:bg-indigo-500! text-white"
                                        style={{
                                            width: '250px',
                                            height: '42px',
                                            fontFamily: 'Poppins, sans-serif',
                                        }}
                                    > Upload Image</Button>
                                </Upload>
                                <DropDownInput
                                    name="role"
                                    label="Role"
                                    control={control}
                                    options={role}
                                    disabled={isSubmitting}
                                    loading={isLoading}
                                />

                            </div>
                            <div>
                                <Button type="primary"
                                    icon={<FormOutlined />}
                                    htmlType="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-indigo-600! hover:bg-indigo-700! drop-shadow-lg text-white disabled:bg-indigo-700/30! cursor-not-allowed"
                                    style={{
                                        height: '40px',
                                        fontFamily: 'Poppins, sans-serif',
                                    }}
                                >
                                    SIGN UP
                                </Button>
                            </div>
                        </form>
                        <p className="mt-5 text-center text-sm text-gray-500">
                            Already have an account?
                            <Link to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignUpPage;