import { useState, useEffect, useRef } from "react";
import {
  useHMSActions,
  useVideo,
  HMSStore,
  selectCameraStreamByPeerID,
  useHMSStore,
  selectPeers,
} from "@100mslive/react-sdk";

const VideoCard = (props: any) => {
  const videoRef = useRef(null);
  const hmsActions = useHMSActions();
  const peer = props.peer;
  // get the camera track to render
  const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id));
  useEffect(() => {
    if (videoRef.current && videoTrack) {
      if (videoTrack.enabled) {
        hmsActions.attachVideo(videoTrack.id, videoRef.current);
      } else {
        hmsActions.detachVideo(videoTrack.id, videoRef.current);
      }
    }
  }, [videoTrack, hmsActions]);

  return (
    <div style={{borderWidth:10, borderColor:'ActiveBorder'}}>
      <video
        ref={videoRef}
        style={{
          borderRadius: 20,
          margin: 30,
          borderColor: "#000000",
          borderWidth: 20,
        }}
        autoPlay={true}
      />
    </div>
  );
};

export default VideoCard;
