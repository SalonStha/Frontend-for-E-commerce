import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "../pages/authentication/loginpage";
import SignupPage from "../pages/authentication/signup-page";
import NotFoundPage from "../pages/error/error-404";
import ActivateUser from "../pages/authentication/activateUser";
import ForgotPassword from "../pages/authentication/forgot-password";
import UserLayout from "../pages/layout/UserLayout";
import { AdminMenu, SellerMenu } from "./menu-item";
import ResetPassword from "../pages/authentication/reset-password";
import { Toaster } from 'sonner';



const routerConfig = createBrowserRouter([
    {
        path: "/",
        Component: LoginPage // This component will be rendered when the path is "/"
    },
    {
        path: "/signup",
        Component: SignupPage,
    },
    {
        path: "*",
        Component: NotFoundPage,
    },
    {
        path: "/forgot-password",
        Component: ForgotPassword
    },
    {
        path: "/reset-password",
        Component: ResetPassword
    },
    {
        path: "/activate/:token",
        Component: ActivateUser
    },
    {
        path: "/admin",
        element: <UserLayout menu={AdminMenu} />, // Using 'element' to render the UserLayout with AdminMenu
    },
    {
        path: "/seller",
        element: <UserLayout menu={SellerMenu} />, // Using 'element' to render the UserLayout with SellerMenu
    }

])
const RouterConfig = () => {
    return (
        <>
        <Toaster/>
            <RouterProvider router={routerConfig} />
        </>
    )
}
export default RouterConfig;