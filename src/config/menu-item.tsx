import { ApartmentOutlined, HomeFilled, OrderedListOutlined, ProductFilled, TransactionOutlined, UserSwitchOutlined } from "@ant-design/icons";
export const AdminMenu = [
    {
        key: '1',
        icon: <HomeFilled />,
        label: 'Dashboard',
    },
    {
        key: '2',
        icon: <UserSwitchOutlined />,
        label: 'Users',
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
    label: string;
}
