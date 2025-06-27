import { Header } from "antd/es/layout/layout";
import logo from "../../assets/images/logo.png";
const UserHeader = () => {
    return (
        <>
            <Header style={{ padding: 0 }} className='bg-gray-50!'>
                <img src={logo} alt="Logo" className="object-contain w-45 mt-3 ml-5" />
            </Header>
        </>
    )

}
export default UserHeader;