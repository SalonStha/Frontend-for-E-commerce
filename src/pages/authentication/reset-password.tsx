import { Link, useNavigate, useParams } from "react-router";
import { PasswordInput } from "../../components/form/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResetPasswordFormDTO, type IResetPasswordForm } from "./validator";
import { KeyOutlined} from "@ant-design/icons";
import authService from "../../services/auth.service";
import { toast} from "sonner"; // Importing Toaster for notifications
import type { SuccessResponse } from "../../config/axios.instance";


const ResetPassword = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate
    const params = useParams(); // Get token from URL
    const { control, handleSubmit, setError } = useForm({
        defaultValues: {
            password: '',
            confirmPassword: '',
        } as IResetPasswordForm, // Default values for the form fields
        resolver: yupResolver(ResetPasswordFormDTO) // Using yup for validation schema
    });
    const submitForm = async (data: IResetPasswordForm) => {
        if (!params.token) {
            toast.error('Invalid or missing reset token.');
            return;
        }
        try {
            await authService.resetPassword(data, params.token as string) as unknown as SuccessResponse;
            console.log('Password reset successful', data);
            toast.success('Password reset successfully!', {
                description: 'Your password has been reset successfully.',
            });
            navigate('/'); // Redirect to login page after reset
            // eslint-disable-next-line
        } catch (exception: any) {
            if (exception.error) {
                Object.keys(exception.error).map((field) => {
                    setError(field as keyof IResetPasswordForm, {
                        message: exception.error[field],
                    });
                });
            }
            toast.error('Failed to reset password', {
                description: exception?.message || 'An error occurred while resetting your password.'
            });
        }
    }
    return (
        <>
            <div className="font-poppins flex w-full h-screen flex-col items-center justify-center bg-gray-200">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="sm:mx-auto sm:w-full rounded-md sm:max-w-md bg-white p-8 shadfont-mediumded-lg">
                            <h2 className="mb-2 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">Reset Password</h2>
                            <p className="mb-5 text-left text-sm text-gray-600">Change your password easily.</p>
                            <form className="space-y-6" onSubmit={handleSubmit(submitForm)} action="#" method="POST">
                                <div> 
                                    <PasswordInput
                                        name="password"
                                        control={control}
                                        label="Enter your new password"
                                        placeholder="Enter your new password"
                                        startAdornmentIcon={<KeyOutlined/>}
                                        className="mb-9" // Add margin bottom for spacing
                                    />
                                    <PasswordInput
                                        name="confirmPassword"
                                        control={control}
                                        label="Confirm your new password"
                                        placeholder="Confirm your new password"
                                        startAdornmentIcon={<KeyOutlined/>}
                                    />
                                </div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 cursor-pointer py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">SEND</button>
                                <div className="text-center text-sm text-gray-500">
                                    <span>Remember your password? <Link to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </>
    );
}
export default ResetPassword;