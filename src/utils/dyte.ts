import axios from 'axios';

const { REACT_APP_DYTE_BACKEND: MY_BACKEND } = process.env;

export const joinExistingRoom = async (meetingId: string, roomName: string) => {
  const resp = await axios({
    url: `${MY_BACKEND}/participant/create`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    data: {
      meetingId: meetingId,
    },
  });

  const authResponse = resp.data.data.authResponse;
  const authToken = authResponse.authToken;

  //saving meeting details in local storage
  localStorage.setItem('auth', authToken);
  localStorage.setItem('meetingID', meetingId);
  localStorage.setItem('roomName', roomName);

  //reloading the page
  window.location.reload();
};
