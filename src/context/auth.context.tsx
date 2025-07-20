/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Gender, UserRoles, Status } from "../config/constant";
import { Spinner } from "../components/loading/Spinnner";
import authService from "../services/auth.service";

interface AuthProviderProps {
    children: ReactNode;
}

export interface ILoggedInUserProfile {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    role: UserRoles,
    gender: Gender,
    status: Status,
    dob: Date | string, // Use Date or string based on your preference
    image: {
        optimizedUrl: string,
        publicId: string,
        secureUrl: string,
    },
    address: {
        billingAddress: string,
        shippingAddress: string
    },
    _id: string,
    createdAt: Date | string, // Use Date or string based on your preference
    updatedAt: string,
    updatedBy: null,
    createdBy: null,

}
export interface IAuthContext {
    loggedInUser: ILoggedInUserProfile | null; // User profile or null if not logged in
    setLoggedInUserProfile: React.Dispatch<React.SetStateAction<ILoggedInUserProfile | null>>; // Function to update the user profile
}

export const AuthContext = createContext<IAuthContext>({
    loggedInUser: null,
    setLoggedInUserProfile: () => {}
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [loggedInUserProfile, setLoggedInUserProfile] = useState<ILoggedInUserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // Optional loading state

    const getLoggedInUserProfile = async() => {
        try {
            const userProfileResponse = await authService.getUserProfile();
            setLoggedInUserProfile(userProfileResponse.data);
        } catch (error) {
            console.error('Error fetching logged in user profile:', error);
        } finally {
            setLoading(false); // Ensure loading is set to false even if there's an error
        }
    }

    useEffect(() => { // Check if the user is logged in by checking for a token in localStorage
        setLoading(true); // Set loading to true while checking the token
        const token = localStorage.getItem('at');
        if (token) {
            getLoggedInUserProfile();

        } else {
            setLoading(false);
        }
    }, []); // You can add any side effects here if needed

    return (
        loading ? <>
            <div className="flex items-center justify-center h-screen flex-col">
                <h1 className="text-2xl font-bold mb-4">Loading...</h1>
                <Spinner size={20} spinWidth={10} />
            </div>

        </> : <>
            <AuthContext.Provider value={{
                loggedInUser: loggedInUserProfile,
                setLoggedInUserProfile: setLoggedInUserProfile
            }}>
                {children} 
            </AuthContext.Provider>
        </>

    )
}

export const useAuth = () => { // Custom hook to access authentication context
    const { loggedInUser, setLoggedInUserProfile } = useContext(AuthContext); // This will allow you to access the logged-in user and the function to update the user profile
    return {
        loggedInUser,
        setLoggedInUserProfile
    };
}