import Sider from "antd/es/layout/Sider";
// import logo from "../../assets/images/logo.png";
import { Menu, Button } from "antd";
import { useState } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import type { IMenuItem } from "../../config/menu-item";
const Siderbar = ({menu}: {menu: Array<IMenuItem>}) => {
    const [collapsed, setCollapsed] = useState(false);
return (
    <>
    <Sider 
      trigger={null} 
      collapsible 
      collapsedWidth={90}
      collapsed={collapsed}
      className="bg-gray-900!">
        <div className="flex-col w-full items-start justify-center mt-5 mb-3 ml-7">
        <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '18px',
              color: 'white',
            }}
          />
        </div>
        <Menu
        theme='dark'
          mode="inline"
          defaultSelectedKeys={['1']}
          className='bg-gray-900!'
          items={menu}
        />
      </Sider>
    </>
)
}
export default Siderbar;