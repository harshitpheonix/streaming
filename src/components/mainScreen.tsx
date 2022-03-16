import React from "react";
import Chat from "./chat";
import Control from "./controlPanel";
import JoinForm from "./join";

const Main = () => {
  return (
    <div>
      <Control />
      <div className="row">
        <JoinForm />
        <Chat/>
      </div>
      
    </div>
  );
};

export default Main;
