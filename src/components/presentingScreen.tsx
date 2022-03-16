import { useEffect, useRef } from "react";
import {
  useHMSActions,
  useHMSStore,
  selectScreenSharesByPeerId,
} from "@100mslive/react-sdk";
/**
 *
 * @param props peer object
 * @returns Presentation screen
 */
const PresentingScreen = (props: any) => {
  const peer = props.peer;
  const videoRef = useRef(null);

  const hmsActions = useHMSActions();
  const presentation = useHMSStore(selectScreenSharesByPeerId(peer.id));
  // to attach incomming video track to video frame
  useEffect(() => {
    if (videoRef.current && presentation.video) {
      if (presentation.video.enabled) {
        hmsActions.attachVideo(presentation.video.id, videoRef.current);
      } else {
        hmsActions.detachVideo(presentation.video.id, videoRef.current);
      }
    }
  }, [presentation, hmsActions]);
  return (
    <div className='prsentationScreen'>
      <video ref={videoRef} className='videoFrame' autoPlay={true} />
    </div>
  );
};

export default PresentingScreen;
