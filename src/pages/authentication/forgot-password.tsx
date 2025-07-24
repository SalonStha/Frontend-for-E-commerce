import { Link } from "react-router";
import { EmailTextInput } from "../../components/form/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgotPasswordFormDTO, type IForgotPasswordForm } from "./validator";
import { LoginOutlined, MailFilled } from "@ant-design/icons";
import authService from "../../services/auth.service";
import { toast } from "sonner";
import type { SuccessResponse } from "../../config/axios.instance";
import { Button } from "antd";


const ForgotPassword = () => {
    const { control, handleSubmit, setError, formState: { isSubmitting, isLoading } } = useForm({
        defaultValues: {
            email: '',
        } as IForgotPasswordForm, // Default values for the form fields
        resolver: yupResolver(ForgotPasswordFormDTO) // Using yup for validation schema
    });
    const submitForm = async (data: IForgotPasswordForm) => {
        try {
            const response = await authService.forgetPassword(data) as unknown as SuccessResponse;
            toast.success('Email sent successfully!', {
                description: response.message
            },
            );
            // eslint-disable-next-line
        } catch (exception: any) {
            console.error('Email sent failed:', exception);
            if (exception.error) {
                Object.keys(exception.error).map((field) => {
                    setError(field as keyof IForgotPasswordForm, {
                        message: exception.error[field],
                    });
                });
            }
            toast.error('Failed to send verification link', {
                description: 'Sorry! The entered email is not registered.'
            });
        }
    }

    return (
        <>
            <div className="font-poppins flex w-full h-screen flex-col items-center justify-center bg-gray-200">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="sm:mx-auto sm:w-full rounded-md sm:max-w-md bg-white p-8 shadfont-mediumded-lg">
                        <h2 className="mb-2 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">Forget Password?<br />No worries</h2>
                        <p className="mb-5 text-left text-sm text-gray-600">Enter your registered email address to get the verification link for password reset.</p>
                        <form className="space-y-6" onSubmit={handleSubmit(submitForm)} action="#" method="POST">
                            <div>
                                <EmailTextInput
                                    name="email"
                                    control={control}
                                    label="Enter your email address"
                                    type="email"
                                    placeholder="Enter your email address"
                                    startAdornmentIcon={<MailFilled />}
                                    disabled={isSubmitting}
                                    loading={isLoading}

                                />
                            </div>
                            <Button type="primary"
                                icon={<LoginOutlined />}
                                htmlType="submit"
                                disabled={isSubmitting}
                                loading={isLoading}
                                className="w-full bg-indigo-600! hover:bg-indigo-700! drop-shadow-lg text-white disabled:bg-gray-500! disabled:text-gray-300! cursor-progress"
                                style={{
                                    height: '40px',
                                    fontFamily: 'Poppins, sans-serif',
                                }}
                            >
                                LOGIN
                            </Button>
                            <div className="mt-3 text-center text-sm text-gray-500">
                                <span>Remember your password? <Link to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</Link></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ForgotPassword;