import axios from 'axios';
import React from 'react';
import { redirect } from 'react-router';
import { useUser } from '../Hooks/UserProvider';

// style
import Button from '@mui/material/Button';

function CreateGameTable() {
  const { profile } = useUser();
  // post request to create a new game table
  const newGame = () => {
    console.log(profile);
    axios.post(
      "http://localhost:8000/api/game/",
      {headers: { Authorization: `Bearer ${profile.credential}` }},
    )
      .then((response) => {
        console.log("response: ", response.data);
        // redirect to the new game table
        return redirect("/gametable/" + response.data.uuid);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // create a modal to request a new game table
  return (
    <Button color="inherit" onClick={newGame}>New Table</Button>
  );

}

export default CreateGameTable;
