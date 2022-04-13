import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
/**
 *
 * @param allMeetings - array of all meetings created by the user
 * @returns - React element
 */
const { REACT_APP_DYTE_BACKEND: MY_BACKEND } = process.env;

const JoiningForm = (props: any) => {
  const [name, setName] = useState("");
  const allMeetings = props.allMeetings;

  const navigate = useNavigate();

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    }
  };
  const meetings = allMeetings.map((meeting: any) => meeting?.data);
  // console.log(meetings.map((meeting: any) => meeting?.meeting));
  /**  Allows User to join a meeting
   *  @param meeting - meeting object to join
   *  
   */
  const joinRoom = async (meeting: any, isHost: boolean = false) => {
    const meetId = meeting?.meeting?.id;
    const roomName = meeting?.meeting?.roomName;

    const res = await axios({
      url: `${MY_BACKEND}/participant/create`,
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      data: {
        meetingId: meetId,
        roleName: "host",
        clientSpecificId: Math.random().toString(36).substring(7),
      },
    });
    console.log(res.data);
    if(res.data.success){
      const authToken = res.data?.data?.authResponse?.authToken;
     //saving meeting details in local storage
     localStorage.setItem("auth", authToken);
     localStorage.setItem("meetingID", meetId);
     localStorage.setItem("roomName", roomName);

     //redirect to meeting page
     navigate(`/dyte/meeting/${roomName}/${meetId}`);
    }
    else{
      alert('Something went wrong. Please try again.')
    }
  };
 

  return (
    <div>
      <h3>Joining Meet</h3>
      <div>
        <span>Name: </span>
        <input placeholder='Name' name='name' onChange={handleInputChange} />
      </div>

      <h3>Rooms Available</h3>
      <div className="roomContainer">
        {meetings.length ? (
        meetings.map((meeting: any) => (
          <div className='row roomCard'>
            <span>Hello: {meeting?.meeting?.title}</span>

            <button className='joinButton' onClick={() => joinRoom(meeting, true)}>
              Join as Host
            </button>
            <button className='joinButton' onClick={() => joinRoom(meeting)}>
              Join as Participant
            </button>
          </div>
        ))): <span>No Rooms Available. Please create one</span>}
      
    </div>
      </div>
      
  );
};

export default JoiningForm;
