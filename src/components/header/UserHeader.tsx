import { Header } from "antd/es/layout/layout";
import logo from "../../assets/images/logo.png";
import { useAuth} from "../../context/auth.context";
import { useNavigate } from "react-router";
import { toast } from 'sonner';
import authService from "../../services/auth.service";
import { BellFilled, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from 'antd';
import { Avatar, Badge, Dropdown, Space} from 'antd';


const UserHeader = () => {
    const { setLoggedInUserProfile } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await authService.logoutUser(); // Call the logout service to clear session
        setLoggedInUserProfile(null); // Clear the user profile from context
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
        navigate('/'); // Redirect to login page
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Profile',
            icon: <UserOutlined />,
        },
        {
            key: '4',
            danger: true,
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: ({ domEvent }) => {
                domEvent.preventDefault();
                handleLogout();
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
                                <Avatar icon={<UserOutlined/>} />
                            </Space>
                        </a>
                    </Dropdown>
                    <Badge count={5} overflowCount={10}>
                        <BellFilled className="text-2xl text-indigo-500! cursor-pointer" />
                    </Badge>
                </div>
            </Header>
        </>
    )

}
export default UserHeader;
