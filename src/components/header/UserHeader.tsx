import { useState } from "react";
import { Header } from "antd/es/layout/layout";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router";
import { toast } from 'sonner';
import authService from "../../services/auth.service";
import { BellFilled, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from 'antd';
import { Avatar, Badge, Dropdown, Space } from 'antd';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const UserHeader = () => {
    const { loggedInUser, setLoggedInUserProfile } = useAuth();
    const navigate = useNavigate();
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    const handleLogout = async () => {
        await authService.logoutUser();
        setLoggedInUserProfile(null);
        toast.success('You have been logged out.', {
            position: 'top-right',
            duration: 3000,
            style: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: '15px',
                margin: '10px',
                padding: '20px',
            },
        });
        setLogoutDialogOpen(false);
        navigate('/');
    };

    const items: MenuProps['items'] = [
        {
            key: 'profile',
            onClick: () => navigate('/profile'),
            label: (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {loggedInUser && loggedInUser.image && loggedInUser.image.optimizedUrl ? (
                        <Avatar src={loggedInUser.image.optimizedUrl} alt="User" size={24} />
                    ) : (
                        <Avatar icon={<UserOutlined />} size={24} />
                    )}
                    <span style={{ fontWeight: 500 }}>
                        {loggedInUser ? `${loggedInUser.firstName} ${loggedInUser.lastName}` : 'User'}
                    </span>
                </span>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            danger: true,
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: ({ domEvent }) => {
                domEvent.preventDefault();
                setLogoutDialogOpen(true);
            },
        },
    ];

    return (
        <>
            <Header style={{ padding: 0 }} className='bg-gray-200! shadow-emerald-200-500 shadow-lg w-full flex items-center justify-between h-20!'>
                <img src={logo} alt="Logo" className="object-contain w-45 ml-5" />
                <div className="flex items-center justify-end pr-15 gap-5">
                    <Dropdown menu={{ items }} overlayStyle={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '15px',
                        margin: '10px',
                        width: '200px',
                        height: 'auto',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                {loggedInUser && loggedInUser.image && loggedInUser.image.optimizedUrl ? (
                                    <Avatar src={loggedInUser.image.optimizedUrl} alt="User" />
                                ) : (
                                    <Avatar icon={<UserOutlined />} />
                                )}
                            </Space>
                        </a>
                    </Dropdown>
                    <Badge count={5} overflowCount={10}>
                        <BellFilled className="text-2xl text-indigo-500! cursor-pointer" />
                    </Badge>
                </div>
            </Header>

            {/* Logout Confirmation Dialog */}
            <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                        <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                            Logout Confirmation
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to logout? You will need to log in again to access your account.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto cursor-pointer"
                                >
                                    Logout
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setLogoutDialogOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default UserHeader;
