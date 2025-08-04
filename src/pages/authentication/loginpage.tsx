import '../../../src/assets/css/style.css';
import logo from '../../../src/assets/images/logo.png';
import googleLogo from '../../../src/assets/images/google-logo.png';
import appleLogo from '../../../src/assets/images/apple-logo.png';
import facebookLogo from '../../../src/assets/images/facebook-logo.png';
import { Link, Navigate, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CredentialsDTO, type ICredentials } from './validator';
import { EmailTextInput, PasswordInput } from '../../components/form/FormInput';
import authService from '../../services/auth.service';
import { KeyOutlined, LoginOutlined, MailFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { toast } from 'sonner';
import { useAuth } from '../../context/auth.context';
import { useCallback } from 'react';


function LoginPage() {
    const navigate = useNavigate();
    const { control, handleSubmit, formState:{isLoading, isSubmitting}, setError } = useForm<ICredentials>({ // React Hook Form for form handling
        defaultValues: {
            email: '',
            password: '',
        } as ICredentials,
        resolver: yupResolver(CredentialsDTO) // Using yup for validation schema,
    }); // Assuming useState is used for form handling, but not implemented in this snippet

    const {setLoggedInUserProfile} = useAuth(); // Custom hook to access authentication context

    const submitForm = useCallback(async (credentials: ICredentials) => {
        try{
            await authService.loginUser(credentials);
            const userProfile = await authService.getUserProfile();
            console.log('User Profile:', userProfile);
            toast.success('Welcome to ' + userProfile.data.role + ' Dashboard', {
                description: `You have successfully logged in as ${userProfile.data.firstName} ${userProfile.data.lastName}.`,
                icon: '👏', // You can use any icon or leave it out
            });
            setLoggedInUserProfile(userProfile.data); // Set the user profile in the context
            navigate('/admin'+userProfile.data.role.toLowerCase()); // Redirect to dashboard after successful login.
            // eslint-disable-next-line
        } catch (exception:any) {
            if (exception.error) {
                Object.keys(exception.error).map((field) => {
                    setError(field as keyof ICredentials, {
                        message: exception.error[field],
                    });
                });
            }
            toast.error('Login Failed', {
                description: exception?.message,
            });
        }
        
    },[])
    const {loggedInUser} = useAuth(); // Custom hook to access authentication context
    if (loggedInUser) {
        return <Navigate to={`/${loggedInUser.role}`} />;
    }

    return ( 
        <>
            <div className="font-poppins flex w-full h-screen flex-col items-center justify-center bg-gray-200">
                <img src={logo} alt="Sasto Bazzar" className="mx-auto mb-4 max-w-[250px] w-full h-auto object-contain" />
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="sm:mx-auto sm:w-full rounded-md sm:max-w-md bg-white p-6 shadfont-mediumded-lg">
                        <h2 className="mb-6 text-center text-2xl font-medium leading-9 tracking-tight text-gray-900">Login to Sasto Bazzar</h2>
                        <form className="space-y-3" onSubmit={handleSubmit(submitForm)} action="#" method="POST">
                            <EmailTextInput
                                control={control}
                                name="email"
                                type="email"
                                label="Enter your email address"
                                startAdornmentIcon={<MailFilled />}
                                placeholder="Enter your email address"
                                disabled={isSubmitting}
                                loading={isLoading}
                            />
                            <div className='mt-10'>
                                <PasswordInput
                                    control={control}
                                    name="password"
                                    label="Enter your password"
                                    placeholder="Enter your password"
                                    startAdornmentIcon={<KeyOutlined/>}
                                    disabled={isSubmitting}
                                    loading={isLoading}
                                />
                            </div>
                            <div className="mt-2 text-right">
                                <Link to="/forgot-password" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">Forgot Password?</Link>
                            </div>
                            <div>
                            <Button type="primary"
                                    icon={<LoginOutlined/>}
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
                            </div>
                        </form><br />
                        <span className="flex items-center">
                            <span className="h-px flex-1 bg-gray-300"></span>

                            <span className="shrink-0 px-4 text-gray-900">Or Login with</span>

                            <span className="h-px flex-1 bg-gray-300"></span>
                        </span><br />
                        <div>
                            <button type="submit" className="mb-2 flex w-full items-center justify-center bg-white border-1 rounded-md p-2 cursor-pointer text-sm border-gray-400 gap-5">
                                <img src={googleLogo} alt="Google logo" className="w-7 h-7 object-contain" />
                                Login with Google
                            </button>
                        </div>
                        <div>
                            <button type="submit" className="mb-2 flex w-full items-center bg-white justify-center border-1 rounded-md p-2 cursor-pointer text-sm border-gray-400 gap-5">
                                <img src={appleLogo} alt="Apple logo" className="w-7 h-7 object-contain" />
                                <a href='https://www.apple.com/'>Login with Apple</a>
                            </button>
                        </div>
                        <div>
                            <button type="submit" className="flex w-full items-center bg-white justify-center border-1 rounded-md p-2 cursor-pointer text-sm border-gray-400 gap-5">
                                <img src={facebookLogo} alt="Apple logo" className="w-7 h-7 object-contain" />
                                Login with Facebook
                            </button>
                        </div>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            New to our site?
                            <Link to="/signup" className="font-semibold leading-6 pl-1 text-indigo-600 hover:text-indigo-500">Sign up now</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
export default LoginPage;


