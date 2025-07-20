import { useAuth } from "../../context/auth.context";

export const SellerDashboard = () => {
    const { loggedInUser } = useAuth();

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Welcome, {loggedInUser?.firstName}!</h2>
                <p className="text-gray-700">You are logged in as an Admin.</p>
                <p className="text-gray-500 mt-2">Email: {loggedInUser?.email}</p>
            </div>
        </>
    )
}
