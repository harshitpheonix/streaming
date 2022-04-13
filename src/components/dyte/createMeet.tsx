import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import JoiningForm from "./joinForm";
const { REACT_APP_DYTE_BACKEND: MY_BACKEND } = process.env;

const CreateMeet = () => {
  const [name, setName] = useState("");
  const [allMeetings, setAllMeetings] = useState<any>([]);

  /**
   *
   * @param event - event from the form
   * Handle Input change for controlled input components
   */
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "name") {
      setName(value);
    }
  };

  /**
   * Memoised version of function to create a new meeting
   * to be added function signature
   */
  const handleCreateRoomClick = useCallback(() => {
    axios({
      url: `${MY_BACKEND}/meeting/create`,
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      data: {
        title: name,
      },
    })
      .then((res) => {
        setAllMeetings([...allMeetings, res.data]);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
    setName("");
  }, [name, allMeetings]);

  useEffect(() => {
    axios.get(`${MY_BACKEND}/meetings`).then((res) => {
      setAllMeetings(res.data.data.meetings);
    });
  }, []);
  return (
    <div>
      <div className='createRoomCard'>
        <h3>Create Room</h3>
        <div>
          <span>Title: </span>
          <input
            value={name}
            placeholder='Name'
            name='name'
            required
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <button className='joinButton' onClick={handleCreateRoomClick}>
          Create
        </button>
      </div>

      <JoiningForm allMeetings={allMeetings} />
    </div>
  );
};

export default CreateMeet;
