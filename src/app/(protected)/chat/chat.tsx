"use client";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React, { useEffect, useState } from "react";
import { userData } from "./data";
import { ChatMessage, ConversationProps } from "@/app/(protected)/chat/types";
import SockJS from "sockjs-client";
import { over } from "stompjs";

export function Chat({ email, cookie, data }: ConversationProps) {
  const [selectedUser, setSelectedUser] = React.useState(userData[0]);
  const [isMobile, setIsMobile] = useState(false);
  const [messagesState, setMessages] = React.useState<ChatMessage[]>(
    data.messages ?? []
  );
  const [privateChats, setPrivateChats] = useState(new Map());

  let stompClient: any = null;
  const conversationData = data.members.map((member) => member);
  const receiverName = conversationData[0].name === email ? 0 : 1;
  const onPrivateMessage = (payload: any) => {
    console.log("asdas");
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };
  const onConnected = () => {
    stompClient.subscribe(
      `/user/${data.conversationId}/private`,
      onPrivateMessage
    );
  };
  const onError = (err: any) => {
    console.log(err);
  };

  const connect = () => {
    let Sock = new SockJS("http://localhost:18080/ws");
    stompClient = over(Sock);
    stompClient.connect(
      { Authorization: "Bearer " + cookie },
      onConnected,
      onError
    );
  };

  const sendPrivateValue = (message: string) => {
    console.log(message);

    if (stompClient) {
      var chatMessage = {
        senderUser: { email: email },
        receiverUser: { email: conversationData[receiverName].email },
        messageText: message,
        conversationId: data.conversationId,
      };
      stompClient.send(
        "/app/private-message",
        { Authorization: `Bearer ${cookie}` },
        JSON.stringify(chatMessage)
      );
    }
  };

  const sendMessage = (newMessage: ChatMessage) => {
    setMessages([...messagesState, newMessage]);
  };

  connect();
  return (
    <>
      {/* <Button onClick={() => connect()}>Connect</Button> */}
      <div className="flex flex-col justify-between w-full h-full">
        <ChatTopbar selectedUser={selectedUser} />

        <ChatList
          messages={messagesState}
          sendMessage={sendMessage}
          isMobile={isMobile}
          data={data}
          email={email}
          sendPrivateValue={sendPrivateValue}
        />
      </div>
    </>
  );
}
