import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import JoinForm from "./components/join";
import Main from "./components/mainScreen";

function App() {
  return (
    <HMSRoomProvider>
      <Main/>
    </HMSRoomProvider>
  );
}

export default App;
