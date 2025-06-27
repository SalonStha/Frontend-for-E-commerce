import { Link } from "react-router";
const SignUpPage = () => {
    return (
        <>
            <div className="font-poppins flex w-full h-screen flex-col items-center justify-center bg-gray-200">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="sm:mx-auto sm:w-full rounded-md sm:max-w-md bg-white p-8 shadfont-mediumded-lg">
                            <h2 className="mt-4 text-left text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
                            <p className="mt-4 mb-3 text-left text-sm text-gray-600">Fill up the form to create a new account</p>
                            <form className="space-y-6" action="#" method="POST">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input type="text" id="firstname" name="firstname" required className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:border-indigo-600 focus:outline-indigo-600"/>
                                </div>
                                <div>
                                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input type="text" id="lastname" name="lastname" required className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                                <input type="email" id="email" name="email" required autoComplete="email" className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <input type="password" id="password" name="password" required autoComplete="new-password" className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm" />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <input type="password" id="confirm-password" name="confirm-password" required autoComplete="new-password" className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="shipping-address" className="block text-sm font-medium text-gray-700">Shipping Address</label>
                                <input type="text" id="shipping-address" name="shipping-address" required className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="billing-address" className="block text-sm font-medium text-gray-700">Billing Address</label>
                                <input type="text" id="billing-address" name="billing-address" required className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                                    <div className="relative mt-1">
                                        <select id="gender" name="gender" required className="block w-full appearance-none rounded-md border border-gray-300 bg-white py-2 px-3 pr-10 text-gray-900 shadow-sm focus:border-indigo-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm">
                                            <option value="" disabled selected>Select Gender </option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M10 14a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 14z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                    <input type="date" id="dob" name="dob" required className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm" />
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 cursor-pointer focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all">SIGN UP</button>
                            </div>
                            </form>
                        <p className="mt-8 text-center text-sm text-gray-500">
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