import { ApartmentOutlined, BranchesOutlined, FileImageFilled, HomeFilled, MessageFilled, OrderedListOutlined, ProductFilled, TransactionOutlined, UserSwitchOutlined } from "@ant-design/icons";
import type React from "react";
import { NavLink } from "react-router";
export const AdminMenu = [
    {
        key: '1',
        icon: <HomeFilled />,
        label: <NavLink to='/admin'>Dashboard</NavLink>,
    },
    {
        key: '2',
        icon: <UserSwitchOutlined />,
        label: <NavLink to='/admin/users'>Users</NavLink>,
    },
    {
        key: '3',
        icon: <BranchesOutlined />,
        label: <NavLink to='/admin/brands'>Brands</NavLink>,
    },
    {
        key: '4',
        icon: <ApartmentOutlined />,
        label: <NavLink to='/admin/category'>Categories</NavLink>,
    },
    {
        key: '5',
        icon: <ProductFilled />,
        label: <NavLink to='/admin/products'>Products</NavLink>,
    },
    {
        key: '6',
        icon: <TransactionOutlined />,
        label: <NavLink to='/admin/transactions'>Transactions</NavLink>,
    },
    {
        key: '7',
        icon: <OrderedListOutlined />,
        label: <NavLink to='/admin/orders'>Orders</NavLink>,
    },
    {
        key: '8',
        icon: <FileImageFilled/>,
        label: <NavLink to='/admin/banners'>Banners</NavLink>,
    },
    {
        key: '9',
        icon: <MessageFilled/>,
        label: <NavLink to='/admin/chats'>Chats</NavLink>,
    },

]
export const SellerMenu = [
    {
        key: '1',
        icon: <HomeFilled />,
        label: 'Dashboard',
    },
    {
        key: '3',
        icon: <ApartmentOutlined />,
        label: 'Categories',
    },
    {
        key: '4',
        icon: <ProductFilled />,
        label: 'Products',
    },
    {
        key: '',
        icon: <TransactionOutlined />,
        label: 'Transactions',
    },
    {
        key: '5',
        icon: <OrderedListOutlined />,
        label: 'Orders',
    },

]

export interface IMenuItem {
    key: string;
    icon: React.ReactNode;
    label: string | React.ReactElement;
}
