import { useEffect, useRef } from "react";
import {
  useHMSActions,
  selectCameraStreamByPeerID,
  useHMSStore,
} from "@100mslive/react-sdk";

const VideoCard = (props: any) => {
  const peer = props.peer;
  const isLocal = peer.isLocal;
  const videoRef = useRef(null);
  const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id));
  const hmsActions = useHMSActions();

  // to attach incomming video track to video frame
  useEffect(() => {
    if (videoRef.current && videoTrack) {
      if (videoTrack.enabled) {
        hmsActions.attachVideo(videoTrack.id, videoRef.current);
      } else {
        hmsActions.detachVideo(videoTrack.id, videoRef.current);
      }
    }
  }, [videoTrack, hmsActions]);

  console.log(peer);

  //To roggle audio of remote peer by the host
  const toggleRemoteVideo = async () => {
    await hmsActions.setRemoteTrackEnabled(peer.videoTrack, !peer.isVideoEnabled);
  }
  //To toggle video by the host
  const toggleRemoteAudio = async () => {
    await hmsActions.setRemoteTrackEnabled(peer.audioTrack, !peer.isAudioEnabled);
  }
  //to remove remote peer by host
  const kickParticipant = async () => {
    await hmsActions.removePeer(peer.id,'Host kicked you out');
  }
 

  /*
   video Card to render the video
   @params
   peer: peer object

  */
  return (
    <div className='videoCard'>
      <video ref={videoRef} className='videoFrame' autoPlay={true} />

      <div>{isLocal ? "You" :peer.name }</div>
      {!isLocal && (
        <div className='videoFooter'>
        {!isLocal ? (
          <button onClick={toggleRemoteAudio}>Toggle Audio</button>
        ) : null}
        {!isLocal ? (
          <button onClick={toggleRemoteVideo}>Toggle Video</button>
        ) : null}
        {!isLocal ? (
          <button onClick={kickParticipant}>Kick</button>
        ) : null}
      </div>
      )}
    </div>
  );
};

export default VideoCard;
