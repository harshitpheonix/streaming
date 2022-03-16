import { useState} from "react";
import {
  useHMSActions,
  useHMSStore,
  selectPeers,
  selectPeersScreenSharing,
} from "@100mslive/react-sdk";
import VideoCard from "./video";
import PresentingScreen from "./presentingScreen";

const Calling = (props: any) => {
  const hmsActions = useHMSActions();
  const [isJoin, setJoin] = useState(false);
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
 const presenters = useHMSStore(selectPeersScreenSharing);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
     hmsActions.join({
      userName: inputValues.name,
      authToken: inputValues.token,
    });
    setJoin(true);
  };
 
  return (
    <>
      {" "}
      {!isJoin ? (
        <form onSubmit={handleSubmit}>
          <h2>Join Room</h2>
          <p>
            Auth Token is of following format:
            eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3Nfa2V5IjoiNjIxMzg5ZWE3YTlkMDRlMjhjNjBhYTdhIiwicm9vbV9pZCI6IjYyMmYwMzQ3ZjA5N2MxNWI5YzdjNDhmYyIsInVzZXJfaWQiOiI2MjEzODllYTdhOWQwNGUyOGM2MGFhNzciLCJyb2xlIjoic3R1ZGVudCIsImp0aSI6ImRlZjc1ZDQ5LTU5NDMtNDlkMS04ZmI4LWQ4NmI2N2FlNGRmMiIsInR5cGUiOiJhcHAiLCJ2ZXJzaW9uIjoyLCJleHAiOjE2NDczMzQ2MDd9.AqeZmQVrLsORjqXrrmam3z8f0NEjRmogg7sUyo21uRw
          </p>
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
      ) : (
        <div>
        <h3>Participants</h3>
        <div className="participantsVideoCardContainer">
          {peers.map((peer: any) => (
            <VideoCard peer={peer} />
          ))}
           
          
        </div>
        {presenters.map((peer: any) => (
            <PresentingScreen peer={peer} />
          ))}
        </div>
      )}
    </>
  );
};

export default Calling;
