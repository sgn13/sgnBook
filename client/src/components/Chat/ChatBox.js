import React, { useState, useEffect, useRef } from "react";
import { useSendConversationMessage, useGetConversationMessages } from '../../Services/chatService'
import commonUtilites from "../../utils/common";
import io from "socket.io-client";
import { Row, List, Avatar, Col, Form, Input, Card } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './ChatBox.css'

let socket;

const ChatBox = (props) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);
  const sendConversationMessage = useSendConversationMessage();
  const getConversationMessages = useGetConversationMessages();

  useEffect(() => {
    reloadMessages()
  }, [lastMessage, props.scope])

  const reloadMessages = () => {
    if (props.scope !== null) {
      getConversationMessages(props.user._id).then((res) => {
        setMessages(res);

      })
    }
  }

  const ENDPOINT = process.env.REACT_APP_API_URL

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("messages", (data) => {
      console.log(data);
      // console.log(data, "Data from socket");
      setLastMessage(data)
      // socket.on("messages", (data) => messages.push(data));
    });
  }, [ENDPOINT]);

  console.log(messages);


  const handleSubmit = (e) => {
    // e.preventDefault();
    sendConversationMessage(props.user._id, newMessage)
    setNewMessage('')
  }

  return (
    <>
      <div >
        <Card>
          <h5 style={{ borderBottom: '1px solid #ddd' }}>{props.scope}</h5>

          <List
            itemLayout="horizontal"
            dataSource={messages}

            renderItem={item => (

              <List.Item
              >
                <List.Item.Meta
                  avatar={<Avatar>{commonUtilites.getInitialsFromName(item.fromObj[0].name)}</Avatar>}
                  // title={item.body}
                  description={item.body}
                />

              </List.Item>
            )}
          />
          {/* {
          messages &&
          <div>
            {messages.map((list) => {
              return (

                <div>{list.body}</div>

              )
            })}

          </div>

        } */}

          <Form onFinish={handleSubmit}>
            {/* <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          /> */}
            <Form.Item >
              <Input placeholder="Type a message ... " type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                suffix={<SendOutlined />}
              />
            </Form.Item>

          </Form>
        </Card>
      </div>
    </>
  );
};

export default ChatBox;
