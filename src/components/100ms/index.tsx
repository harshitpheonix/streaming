import { HMSRoomProvider } from "@100mslive/react-sdk";
import React from "react";
import Main from "./100msMainScreen";

const VideoCalling_100ms = () => {
  return (
    <HMSRoomProvider>
      <Main />
    </HMSRoomProvider>
  );
};

export default VideoCalling_100ms;
