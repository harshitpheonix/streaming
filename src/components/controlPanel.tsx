import React,{ useEffect, useState } from 'react';
import {
  useHMSActions,
  useHMSStore,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectPeersScreenSharing,
  
} from "@100mslive/react-sdk";
const Control = (props: any) => {
    const [isAudioOn, setIsAudioOn] = useState(useHMSStore(selectIsLocalAudioEnabled));
    const [isVideoOn, setIsVideoOn] = useState(useHMSStore(selectIsLocalVideoEnabled));
    const [isScreenShare, setScreenShare] = useState(false);
    const [presentingScreen, setPresentingScreen] = useState(useHMSStore(selectPeersScreenSharing));
    const hmsActions = useHMSActions();
    const presenters = useHMSStore(selectPeersScreenSharing);
    // const presenters = hmsStore.getState(selectPeersScreenSharing);
    // leave the room
    console.log('presenters')
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
    const shareScreen = async () => {
        try {
            await hmsActions.setScreenShareEnabled(true);
            setScreenShare(true)
        } catch (error:any) {
            // an error will be thrown if user didn't give access to share screen
            alert(error.message);
        }
        
    }
    useEffect(() => {
        alert('ss shared')

    },[isScreenShare])
    return (
        <div className="callingControl">
        <div className="rowSpace">
            <button className='button leaveButton' onClick={leaveRoom}>Leave Call</button>
            <button className='button leaveButton' onClick={toggleLocalAudio}>{isAudioOn?'Mute':'Unmute'}</button>
            <button className='button leaveButton' onClick={toggleLocalVideo}>{isVideoOn?'Off Video':'On Video'}</button>
            <button className='button leaveButton' onClick={shareScreen}>Share Screen</button>
        </div>
        </div>
    );
}

export default Control;