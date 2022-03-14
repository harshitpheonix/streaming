import { useState, useRef, createRef } from "react";
import {
  useHMSActions,
  useVideo,
  HMSStore,
  selectCameraStreamByPeerID,
  useHMSStore,
  selectPeers,
} from "@100mslive/react-sdk";
import VideoCard from "./video";

const JoinForm = (props: any) => {
  const hmsActions = useHMSActions();
  const [roomName, setRoomName] = useState("");
  const [inputValues, setInputValues] = useState({
    name: "",
    token: "",
  });
  const peers = useHMSStore(selectPeers);
  const handleInputChange = (e: any) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };
  
  console.log(peers);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const room = hmsActions.join({
      userName: inputValues.name,
      authToken: inputValues.token,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Join Room</h2>
        <div className='input-container'>
          <input
            required
            value={inputValues.name}
            onChange={handleInputChange}
            id='name'
            type='text'
            name='name'
            placeholder='Your name'
          />
        </div>
        <div className='input-container'>
          <input
            required
            value={inputValues.token}
            onChange={handleInputChange}
            id='token'
            type='text'
            name='token'
            placeholder='Auth token'
          />
        </div>
        <button className='btn-primary'>Join</button>
      </form>
      {peers.map((peer: any) => (<VideoCard peer={peer} />))}
      
    </>
  );
};

export default JoinForm;
