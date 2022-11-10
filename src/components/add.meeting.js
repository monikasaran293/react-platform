import { useContext, useEffect, useState } from "react"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { MeetingOrganizerContext } from "../App";


const AddMeeting = () => {
  const { state, dispatch } = useContext(MeetingOrganizerContext);

  return <FormControl sx={{}} size="small">
    <TextField
      required
      id="outlined-required"
      label="Title"
    />
    <TextField
      required
      id="outlined-required"
      type={'date'}
      label="Date"
    />
    <TextField
      required
      id="outlined-required"
      type={'time'}
      label="Start Time"
    />
    <TextField
      required
      id="outlined-required"
      type={'time'}
      label="End Time"
    />
  </FormControl>
}

export default AddMeeting