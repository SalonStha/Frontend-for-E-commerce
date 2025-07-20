import { createBrowserRouter, RouterProvider } from "react-router";
import LoginPage from "../pages/authentication/loginpage";
import SignupPage from "../pages/authentication/signup-page";
import NotFoundPage from "../pages/error/error-404";
import ActivateUser from "../pages/authentication/ActivateUser";
import ForgotPassword from "../pages/authentication/forgot-password";
import UserLayout from "../pages/layout/UserLayout";
import { AdminMenu, SellerMenu } from "./menu-item";
import ResetPassword from "../pages/authentication/reset-password";
import { Toaster } from 'sonner';
import  AdminDashboard  from "../pages/dashboard/AdminDashboard";
import { UserRoles } from "./constant";
import BannerPage from "../pages/banner/BannerPage";
import BrandPage from "../pages/brand/BrandPage";
import ProductsPage from "../pages/products/ProductsPage";
import UserPage from "../pages/user/UserPage";
import ProductCreatePage from "../pages/products/ProductCreatePage";
import AddBrand from "../pages/brand/AddBrand";
import UpdateBrand from "../pages/brand/UpdateBrand";
import CategoryPage from "../pages/categories/CategoryPage";
import AddCategory from "../pages/categories/AddCategory";
import UpdateCategory from "../pages/categories/UpdateCategory";



const routerConfig = createBrowserRouter([ // Creating a browser router configuration
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
        path: "/reset-password/:token",
        Component: ResetPassword
    },
    {
        path: "/activate/:token",
        Component: ActivateUser
    },
    {
        path: "/admin",
        element: <UserLayout role= {UserRoles.ADMIN} menu={AdminMenu} />,
        children: [
            { index: true, Component: AdminDashboard },
            { path: "users", Component: UserPage }, 
            { path: "brands", Component: BrandPage }, 
            { path: "brands/create", Component: AddBrand },
            { path: "brands/:id", Component: UpdateBrand },
            { path: "category", Component: CategoryPage }, 
            { path: "category/:id", Component: UpdateCategory }, 
            { path: "category/create", Component: AddCategory },
            { path: "products", Component: ProductsPage },
            { path: "products/create", Component: ProductCreatePage },
            { path: "transactions", Component: AdminDashboard },
            { path: "orders", Component: AdminDashboard },
            { path: "banners", Component: BannerPage },
            { path: "chats", Component: AdminDashboard },
            { path: "*", Component: NotFoundPage },
        ] // Using 'element' to render the UserLayout with AdminMenu
    },
    {
        path: "/Seller",
        element: <UserLayout role= {UserRoles.SELLER} menu={SellerMenu} />, // Using 'element' to render the UserLayout with SellerMenu
    },
    {
        path: "/Seller",
        element: <UserLayout role= {UserRoles.SELLER} menu={SellerMenu} />, // Using 'element' to render the UserLayout with SellerMenu
    }

])
const RouterConfig = () => {
    return (
        <>
            <Toaster
                richColors={true}
                closeButton={true}
                position="top-right"
                duration={2000}
                theme="light"
                gap={15}
                toastOptions={{
                    style: {
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '15px',
                        margin: '10px',
                        padding: '20px',
                    }
                }}
            />
            <RouterProvider router={routerConfig}/> 
        </>
    )
}
export default RouterConfig;