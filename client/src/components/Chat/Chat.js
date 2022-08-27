import React, { useState, useEffect } from 'react';
import ChatBox from './ChatBox'
import Conversations from './Conversations'
import { Row, Col, Divider } from 'antd';
import { Tabs } from 'antd';
import Users from './Users';
const { TabPane } = Tabs;

const Chat = () => {
    const [user, setUser] = useState('');
    const [scope, setScope] = useState('User Chat');

    return (

        <Row>
            <Col span={3} style={{ borderRight: '1px solid silver' }}>
                <h3>Chat Users</h3>
                <Tabs defaultActiveKey="2">
                    <TabPane
                        tab={
                            <span>
                                Chats
                            </span>
                        }
                        key="1"
                    >
                        Conversations
                        <Conversations setUser={setUser} setScope={setScope} />
                    </TabPane>

                    <TabPane
                        tab={
                            <span>
                                Users
                            </span>
                        }
                        key="2"
                    >
                        <h3>Users</h3>
                        <Users setUser={setUser} setScope={setScope} />

                    </TabPane>
                </Tabs>
            </Col>
            <Col span={19} offset={1}>
                <ChatBox user={user} scope={scope} />
            </Col>
        </Row>

    );
};

export default Chat;
