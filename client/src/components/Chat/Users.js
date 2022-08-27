import React, { useState, useEffect } from "react";
import { useGetUsers } from "../../Services/userService";
import { Avatar } from 'antd';
import io from 'socket.io-client'
import { UserOutlined } from '@ant-design/icons';
import { List, Layout, Menu, } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

let socket;

const Users = (props) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState(null);
  const getUsers = useGetUsers();
  const ENDPOINT = process.env.REACT_APP_API_URL


  // const handleRecipent = (recipients) => {
  //   for(let i=0; i<recipients.length;i++){
  //     if(recipients[i].username !== a)
  //   }
  // }

  useEffect(() => {
    async function fetchData() {
      const res = await getUsers();
      setUsers(res)
    }
    fetchData()
  }, [newUser])

  useEffect(() => {
    const socket = io(ENDPOINT)
    socket.on("users", (data) => {
      setNewUser(data)
    })
  }, []);
  return (
    <>
      {/* {users.map((u) => (
        <p

          key={u._id}
          onClick={() => {
            props.setUser(u);
            props.setScope(u.name);
          }}
        // button
        >
          <Avatar icon={<UserOutlined />}></Avatar>
          {u.name}
        </p>

      ))} */}
      {/* <List
        style={{ marginRight: '30px' }}
        bordered
        dataSource={users}
        renderItem={item => <List.Item
          onClick={() => {
            props.setUser(item);
            props.setScope(item.name);
          }}>{item.name}</List.Item>}
      /> */}

      <Sider className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', width: '100%', borderRight: 0 }}
        >
          {users.map((item, index) => {
            return (
              <Menu.Item key={index}
                onClick={() => {
                  props.setUser(item);
                  props.setScope(item.name);
                }}
              > { item.name}</Menu.Item>
            )
          })}

        </Menu>
      </Sider>
    </>
  );
};

export default Users;
