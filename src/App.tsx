import React from "react";
import "./App.css";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import Main from "./components/mainScreen";

function App() {
  return (
    <HMSRoomProvider>
      <Main/>
    </HMSRoomProvider>
  );
}

export default App;
