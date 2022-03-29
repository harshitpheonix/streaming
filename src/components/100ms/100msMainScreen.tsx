import React from "react";
import Chat from "./chat";
import JoinForm from "./join";
/**
 * 
 * @returns {React.ReactElement} - Main screen for 100ms
 */
const HomeScreen_100ms = () => {
  return (
    <div>
      <div className="">
        <JoinForm />
        <Chat/>
      </div>
      
    </div>
  );
};

export default HomeScreen_100ms;
