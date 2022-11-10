import { useContext, useEffect, useState } from "react"
import { parse } from "date-fns";
import {
  Grid,
  TextField,
} from '@mui/material';
import { MeetingOrganizerContext } from "../App";
import { getFormattedDate } from "../util";


const AddMeeting = () => {
  const { state: { addMeeting }, dispatch } = useContext(MeetingOrganizerContext);
  const { title, date, startTime, endTime, meetingRoomId } = addMeeting

  const handleFormInputChange = (data) => {
    dispatch({ type: 'ADD_MEETING', data })
  }

  return <>
    <TextField
      required
      fullWidth
      id="outlined-required"
      label="Title"
      value={title}
      onChange={(e) => handleFormInputChange({ title: e.target.value })}
    />
    <Grid container marginY={2}>
      <Grid item xs={3} >
        <TextField
          required
          id="outlined-required"
          type={'date'}
          label="Date"
          value={getFormattedDate(parse(date, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd')}
          onChange={(e) => {
            const meetingDate = getFormattedDate(e.target.value)
            handleFormInputChange({ date: meetingDate })
          }}
        />
      </Grid>

      <Grid item xs={2}>
        <TextField
          required
          id="outlined-required"
          type={'time'}
          label="Start Time"
          value={startTime}
          onChange={(e) => handleFormInputChange({ startTime: e.target.value })}
        />
      </Grid>

      <Grid item xs={2}>
        <TextField
          required
          id="outlined-required"
          type={'time'}
          label="End Time"
          value={endTime}
          onChange={(e) => handleFormInputChange({ endTime: e.target.value })}
        />
      </Grid>
    </Grid>
  </>
}

export default AddMeeting