import React from "react";
import { useNavigate } from "react-router-dom";
/**
 *
 * @returns {React.ReactElement} - Landing Screen
 */
const LandingScreen = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/100ms")}>100ms</button>
      <button onClick={() => navigate("/dyte")}>Dyte.io</button>
    </div>
  );
};
export default LandingScreen;
