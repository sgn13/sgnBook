import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const Sidebar = () => {
    return (
        <div style={{ borderRight: '1px solid silver', height: '100%' }}>
            Sagun Shrestha
            <br />
            <br />
            <Sider className="site-layout-background">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', width: '100%', borderRight: 0 }}
                >
                    <SubMenu key="sub1" icon={<UserOutlined />} title="Friends">
                        <Menu.Item key="1">option1</Menu.Item>
                        <Menu.Item key="2">option2</Menu.Item>
                        <Menu.Item key="3">option3</Menu.Item>
                        <Menu.Item key="4">option4</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="Posts">
                        <Menu.Item key="5">Recent Posts</Menu.Item>
                        <Menu.Item key="6">Most discussed posts</Menu.Item>
                        <Menu.Item key="7">Most liked posts</Menu.Item>
                        <Menu.Item key="8">option8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<NotificationOutlined />} title="Profiles">
                        <Menu.Item key="9">option9</Menu.Item>
                        <Menu.Item key="10">option10</Menu.Item>
                        <Menu.Item key="11">option11</Menu.Item>
                        <Menu.Item key="12">option12</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        </div>
    )
}

export default Sidebar
