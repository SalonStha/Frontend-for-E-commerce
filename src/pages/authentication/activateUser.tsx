import { Spinner } from "../../components/loading/Spinnner";
import { useEffect, useState } from "react";

const ActivateUser = () => {
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 10000);
    }, []);
    return(
        <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {
                loading ? (
                    <Spinner size={20} color="teal-600" spinWidth={4} />
                ) : (
                    <div className="text-green-600 text-2xl font-bold">
                        Account Activated Successfully!
                    </div>
                )
            }
            </div>
        </>
    )
}
export default ActivateUser;