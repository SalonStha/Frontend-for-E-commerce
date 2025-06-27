import { useEffect, useState } from 'react';
import '../../../src/assets/css/style.css';
import logo from '../../../src/assets/images/logo.png';
import googleLogo from '../../../src/assets/images/google-logo.png';
import appleLogo from '../../../src/assets/images/apple-logo.png';
import facebookLogo from '../../../src/assets/images/facebook-logo.png';
import { Link } from 'react-router';
// import SignUpPage from './signup-page';
export interface ICredentials {
    email: string;
    password: string;
}

function LoginPage() {
    const [credentials, setCredentials] = useState<ICredentials>({  // Initializing state with an empty credentials object
        email: '',
        password: '',
    }); // This state can be used to manage form data or other information if needed

    const submitHandler = (e: React.SyntheticEvent) => { // Function to handle form submission
        e.preventDefault(); // Prevent the default form submission behavior
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Function to handle input changes
        setCredentials({ ...credentials, [e.target.name]: e.target.value }); // Update the credentials state with the new input value
    }
    console.log("LoginPage rendered with credentials:", credentials); // Log the current state of credentials to the console for debugging

    const [loading, setLoading] = useState<boolean>(); // State to manage loading status, currently not used in this component
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    return (
        <>
            <div className="font-poppins flex w-full h-screen flex-col items-center justify-center bg-gray-200">
                <img src={logo} alt="Sasto Bazzar" className="mx-auto mb-4 max-w-[250px] w-full h-auto object-contain" />
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="mx-auto w-full rounded-md sm:max-w-sm bg-white p-8 shadfont-mediumded-lg">
                        <h2 className="mb-6 text-center text-2xl font-medium leading-9 tracking-tight text-gray-900">Login to Sasto Bazzar</h2>
                        <form className="space-y-6" onSubmit={submitHandler} action="#" method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Enter your email address</label>
                                <div className="mt-2">
                                    <input 
                                    id="email" 
                                    name="email" 
                                    autoComplete='email'
                                    type="email" 
                                    required
                                    className="p-2 block w-full rounded-md border border-gray-400 focus:border-indigo-600 text-sm text-gray-600" 
                                    onChange={handleChange}/>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Enter your password</label>
                                </div>
                                <div className="mt-2 relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="p-2 block w-full rounded-md border border-gray-400 focus:border-indigo-600 text-sm text-gray-600" 
                                        onChange={handleChange}/>
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none cursor-pointer"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            // Eye-off SVG
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c2.083 3.61 6.017 6 9.75 6 1.563 0 3.06-.322 4.396-.902M6.53 6.53A9.956 9.956 0 0 1 12 6c3.733 0 7.667 2.39 9.75 6a10.477 10.477 0 0 1-1.284 1.977M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-9.193 9.193l16.386-16.386" />
                                            </svg>
                                        ) : (
                                            // Eye SVG
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12C3.978 7.943 7.522 5.25 12 5.25c4.478 0 8.022 2.693 9.75 6.75-1.728 4.057-5.272 6.75-9.75 6.75-4.478 0-8.022-2.693-9.75-6.75z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <div className="mt-2 text-right">
                                    <Link to="/forgot-password" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">Forgot Password?</Link> 
                                </div>
                            </div>

                            <div>
                                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 cursor-pointer py-1.5 text-sm font-regular leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">LOGIN</button>
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
