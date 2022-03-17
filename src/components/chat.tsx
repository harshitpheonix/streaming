import React, { useState } from "react";
import {
  useHMSActions,
  useHMSStore,
  selectHMSMessages,
} from "@100mslive/react-sdk";
/**
 *  chat section
 *  
 */
const Chat = (props: any) => {
  const [chatMessage, setChatMessage] = useState(
    useHMSStore(selectHMSMessages)
  );
  const hmsActions = useHMSActions();
 
  const sendMessageToAll = () => {
    setChatMessage(()=>chatMessage);
    hmsActions.sendBroadcastMessage("Helllooo");
  };
  return (
    <div>
      {chatMessage.map((chat) => (
        <h4>{chat.message}</h4>
      ))}
      <button className='button' onClick={sendMessageToAll}>
        Send
      </button>
    </div>
  );
};

export default Chat;
