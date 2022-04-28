import axios from "axios";
import { DyteMeeting, Meeting } from "dyte-client";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { joinExistingRoom } from "../../utils/dyte";
const MY_BACKEND = process.env.REACT_APP_DYTE_BACKEND;
const VideoFrame_Dyte = () => {
  const navigate = useNavigate();
  const { room, meetId } = useParams();
  const [authToken, setAuthToken] = useState(localStorage.getItem("auth"));
  const roomName = localStorage.getItem("roomName");
  const meetingID = localStorage.getItem("meetingID");
  // const authToken = localStorage.getItem("auth");
  console.log(roomName, meetingID, authToken);
  useEffect(() => {
    if (authToken) {
      if (meetId && room) {
        //creating a new participant
        console.log("creating a new participant");
        joinExistingRoom(meetId, room)
          .then((res) => {
            console.log("creating a new participant");
            setAuthToken(localStorage.getItem("auth"));
            console.log(authToken);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      axios({
        url: `${MY_BACKEND}/participant/create`,
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        data: {
          meetingId: meetId,
        },
      })
        .then((resp) => {
          const authResponse = resp.data.data.authResponse;
          const authToken = authResponse.authToken;
          setAuthToken(authToken);
          localStorage.setItem("auth", authToken);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [meetId, room]);
  const fetchAuthToken = () => {
    if (authToken) return authToken;
  };
  const onDyteInit = (meeting: Meeting) => {
    meeting.on(meeting.Events.meetingEnded, () => {
      localStorage.clear();
      navigate("/dyte");
    });
  };
 const controlBarElements= {
    fullscreen:   true,
    share:        true,
    screenShare:  true,
    layout:       true,
    chat:         true,
    polls:        false,
    participants: true,
    plugins:      true
}
  return (
    <>
      {!!authToken && !!roomName && (
        <DyteMeeting
          onInit={onDyteInit}
          // uiConfig={}
          clientId={process.env.REACT_APP_DYTE_ORG_ID!}
          meetingConfig={{
            roomName: roomName,
            authToken: authToken,
            apiBase: process.env.REACT_APP_DYTE_BASE_URL,
            showSetupScreen: true,
          }}
          onError={(error) => {
            alert(error);
          }}
        />
      )}
    </>
  );
};
export default VideoFrame_Dyte;
