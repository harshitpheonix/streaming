import { DyteMeeting, Meeting } from "dyte-client";
import React, { useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { joinExistingRoom } from "../../utils/dyte";

const VideoFrame_Dyte = () => {
  const navigate = useNavigate();
  const { room, meetId } = useParams();
 
  const roomName = localStorage.getItem("roomName");
  const meetingID = localStorage.getItem("meetingID");
  const authToken = localStorage.getItem("auth");
  console.log(roomName, meetingID, authToken);
  useEffect(() => {
    if (authToken && roomName&& meetId&&room) {
      //creating a new participant
      console.log("creating a new participant");
      joinExistingRoom(meetId, room);
      console.log("creating a new participant");
    }
  }, [authToken, roomName, meetId, room]);
  return (
    <>
      {!!authToken && !!roomName && (
        <DyteMeeting
          onInit={(meeting) => console.log(meeting)}
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
