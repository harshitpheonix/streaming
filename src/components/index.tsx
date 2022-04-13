import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VideoCalling_100ms from "./100ms";
import VideoCalling_Dyte from "./dyte";
import MeetingRoom_Dyte from "./dyte/meetingRoom";
import LandingScreen from "./landingScreen";

/**
 *
 * @returns {React.ReactElement} - Router to the different components
 */
const Main = () => {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path='/' element={<LandingScreen />} />
          <Route path='/100ms' element={<VideoCalling_100ms />} />
          <Route path='/dyte' element={<VideoCalling_Dyte />} />

          <Route
            path='/dyte/meeting/:room/:meetId'
            element={<MeetingRoom_Dyte />}
          />
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default Main;
