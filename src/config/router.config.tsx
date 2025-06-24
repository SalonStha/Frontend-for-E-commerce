import {createBrowserRouter, RouterProvider} from "react-router";
import LoginPage from "../pages/authentication/loginpage";
import SignupPage from "../pages/authentication/signup-page";
import NotFoundPage from "../pages/error/error-404";
import ActivateUser from "../pages/authentication/activateUser";
import ForgotPassword from "../pages/authentication/forgot-password";

const routerConfig =  createBrowserRouter([
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
        path: "/activate/:token",
        Component: ActivateUser
    }
])
const RouterConfig = () => {
    return ( 
    <>
    <RouterProvider router={routerConfig}/> 
    </> // This will render the RouterProvider with the defined routes
    )
}
export default RouterConfig;