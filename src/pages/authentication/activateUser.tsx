import { useNavigate, useParams } from "react-router";
import { Spinner } from "../../components/loading/Spinnner";
import { useEffect } from "react";
import authService from "../../services/auth.service";
import { toast } from "sonner";
import type { SuccessResponse } from "../../config/axios.instance";

const ActivateUser = () => {

    const params = useParams();

    const navigate = useNavigate();

    const activateUser = async () => {
        try {
            const token = params.token;
            const response = await authService.activateUserProfile(token as string) as unknown as SuccessResponse;
            toast.success('Account activated successfully', {
                description: response.message,
                richColors: true,
                closeButton: true,
                position: 'top-right',
                duration: 5000, // Adjust the duration as needed
                style: {
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '15px',
                    margin: '10px',
                    padding: '20px',
                },
            });
            navigate('/'); // Redirect to login page after activation
            // eslint-disable-next-line
        } catch (exception: any) {
            toast.error('Account activation failed', {
                description: exception?.message,
                richColors: true,
                closeButton: true,
                position: 'top-right',
                duration: 5000, // Adjust the duration as needed
                style: {
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '15px',
                    margin: '10px',
                    padding: '20px',
                },
            });
            navigate('/'); // Redirect to login page on error
        }
    }
    useEffect(() => {
        activateUser(); // Call the activation function when the component mounts
    }, []);
    return (
        <>
            <div className="flex w-full items-center justify-center  bg-gray-100">
                <h1 className="text-2xl font-bold text-gray-800">Activating your account...</h1>
            </div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <p className="text-gray-600 mb-4">Please wait while we activate your account.</p>
                <Spinner size={20} color="teal-600" spinWidth={4} />
                <p className="text-gray-600 mt-4">This may take a few seconds.</p>
                <p className="text-gray-600 mt-2">If you are not redirected, please check your email for the activation link.</p>
            </div>
        </>
    )
}
export default ActivateUser;