import React, { useEffect, useState } from "react";
import {
  useHMSActions,
  useHMSStore,
  selectHMSMessages,
  useHMSNotifications,
  HMSNotificationTypes,
} from "@100mslive/react-sdk";
/**
 *  chat section
 *
 */
const Chat = (props: any) => {
  const [chatMessage, setChatMessage] = useState(
    useHMSStore(selectHMSMessages)
  );
  const [inputValue, setInputValue] = useState("");
  const hmsActions = useHMSActions();
  const notifications = useHMSNotifications();
  console.log(notifications, "$$$$");
  useEffect(() => {
    if (!notifications) {
      return;
    }
    switch (notifications.type) {
      case HMSNotificationTypes.NEW_MESSAGE:
        setChatMessage([...chatMessage, notifications.data]);
        console.log(chatMessage, "chatMessage");
        break;
      default:
        break;
    }
  }, [notifications]);
  /**
   *  broacasts message to every peer
   */
  const sendMessageToAll = () => {
    // setChatMessage(() => [...chatMessage, inputValue]);
    hmsActions.sendBroadcastMessage(inputValue);
    setInputValue("");
  };
  return (
    <div className='chatContainer'>
      {chatMessage.map((chat) => (
        <div>
          <p>{chat.senderName}</p>
          <h4>{chat.message}</h4>
        </div>
      ))}
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      <button className='button' onClick={sendMessageToAll}>
        Send
      </button>
    </div>
  );
};

export default Chat;
