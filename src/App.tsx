import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HMSRoomProvider } from '@100mslive/react-sdk';
import JoinForm from './components/join';

function App() {
  return (
    <HMSRoomProvider>
       {/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */}
    <JoinForm/>
    </HMSRoomProvider>
   
  );
}

export default App;
