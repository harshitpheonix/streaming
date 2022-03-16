import React,{ useState } from 'react';
import {
  useHMSActions,
  useHMSStore,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  
} from "@100mslive/react-sdk";
const Control = (props: any) => {
    const [isAudioOn, setIsAudioOn] = useState(useHMSStore(selectIsLocalAudioEnabled));
    const [isVideoOn, setIsVideoOn] = useState(useHMSStore(selectIsLocalVideoEnabled));
    const [isScreenShare, setScreenShare] = useState(false);
    
    const hmsActions = useHMSActions();
    
   
    // leave the room
    const leaveRoom = () => {
        hmsActions.leave();
    }
    //toggle local audio
    const toggleLocalAudio = async () => {
      await hmsActions.setLocalAudioEnabled(!isAudioOn);
        setIsAudioOn(!isAudioOn);
    }
    //toggle local video
    const toggleLocalVideo = async () => {
        await hmsActions.setLocalVideoEnabled(!isVideoOn);
        setIsVideoOn(!isVideoOn);
    }
    /**
     *  Toggle Screen Share
     */
    const toggleShareScreen = async () => {
        try {
            
            await hmsActions.setScreenShareEnabled(!isScreenShare);
            setScreenShare(!isScreenShare)
        } catch (error:any) {
            // an error will be thrown if user didn't give access to share screen
            alert(error.message);
        }
    }
    return (
        <div className="callingControl">
        <div className="rowSpace">
            <button className='button leaveButton' onClick={leaveRoom}>Leave Call</button>
            <button className='button leaveButton' onClick={toggleLocalAudio}>{isAudioOn?'Mute':'Unmute'}</button>
            <button className='button leaveButton' onClick={toggleLocalVideo}>{isVideoOn?'Off Video':'On Video'}</button>
            <button className='button leaveButton' onClick={toggleShareScreen}> {isScreenShare?'Stop Screen Sharing':'Start Share Screen'}</button>
        </div>
        </div>
    );
}

export default Control;