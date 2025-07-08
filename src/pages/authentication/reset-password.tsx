import { Link } from "react-router";
import { PasswordInput } from "../../components/form/FormInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ForgotPasswordFormDTO, type IForgotPasswordForm } from "./validator";
import { KeyOutlined} from "@ant-design/icons";

export interface IForgotPasswordForm {
    email: string;
}

const ResetPassword = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
        } as IForgotPasswordForm, // Default values for the form fields
        resolver: yupResolver(ForgotPasswordFormDTO) // Using yup for validation schema
    });
    const submitForm = (data: IForgotPasswordForm) => {
        console.log('Form submitted with data:', data);
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
                                    <PasswordInput
                                        name="password"
                                        control={control}
                                        label="Enter your new password"
                                        type="password"
                                        placeholder="Enter your new password"
                                        startAdornmentIcon={<KeyOutlined/>}
                                    />
                                    <PasswordInput
                                        name="confirmPassword"
                                        control={control}
                                        label="Confirm your new password"
                                        type="password"
                                        placeholder="Confirm your new password"
                                        startAdornmentIcon={<KeyOutlined/>}
                                    />
                                </div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 cursor-pointer py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">SEND</button>
                                <div className="mt-10 text-center text-sm text-gray-500">
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