import React, { useState, useEffect } from "react";
import { useGetConversations } from "../../Services/chatService";
import { List, Avatar } from 'antd';
import io from 'socket.io-client'
import commonUtilites from '../../utils/common'
import { authenticationService } from "../../Services/authenticationService";

let socket;


const Conversations = (props) => {

  const [conversations, setConversations] = useState([])
  const [newConversation, setNewConversation] = useState(null);

  const ENDPOINT = process.env.REACT_APP_API_URL


  const getConversations = useGetConversations();

  const handleRecipient = (recipents) => {
    for (let i = 0; i < recipents.length; i++) {
      if (
        recipents[i].name !== authenticationService.currentUserValue?.name
      ) {
        return recipents[i]
      }
    }
    return null;
  }

  useEffect(() => {
    getConversations().then((res) => setConversations(res))
  }, [])

  useEffect(() => {
    let socket = io(ENDPOINT);
    socket.on("messages", (data) => setNewConversation(data));

    return () => {
      socket.removeListener("messages");
    };
  }, [ENDPOINT]);

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={conversations}
        renderItem={data => (
          <List.Item
            onClick={() => {
              props.setUser(handleRecipient(data.recipientObj));
              props.setScope(handleRecipient(data.recipientObj).name)
            }}
          >
            <List.Item.Meta
              avatar={<Avatar />}
              title={handleRecipient(data.recipientObj).name}
              description={data.lastMessage}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default Conversations;
