const ForgotPassword = () => {
    return (
        <>
            <div className="font-poppins flex w-full h-screen flex-col items-center justify-center bg-gray-200">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="sm:mx-auto sm:w-full rounded-md sm:max-w-md bg-white p-8 shadfont-mediumded-lg">
                            <h2 className="mb-1 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">Forget Password?<br />No worries</h2>
                            <p className="mb-5 text-left text-sm text-gray-600">Enter your registered email address to get the verification to reset you password</p>
                            <form className="space-y-6" action="#" method="POST">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mb-2">Enter your email address</label>
                                    <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 cursor-pointer py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">SEND</button>
                                <div className="mt-10 text-center text-sm text-gray-500">
                                    <span>Remember your password? <a href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</a></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </>
    );
}
export default ForgotPassword;