import { useContext, useEffect, useState } from "react"
import { add, addMinutes, differenceInMinutes, format, parse } from "date-fns";
import {
  Grid,
  TextField,
} from '@mui/material';
import { MeetingOrganizerContext } from "../../App";
import { getFormattedDate } from "../../util";


const AddMeeting = () => {
  const { state: { addMeeting }, dispatch } = useContext(MeetingOrganizerContext);
  const { title, date, startTime, endTime, meetingRoomId } = addMeeting

  const getDateFromTime = (time) => new Date(`${date} ${time}`)

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
          onChange={(e) => {
            const time = {
              startTime: e.target.value
            }
            if (time.startTime >= endTime) {
              const dateLeft = getDateFromTime(startTime)
              const dateRight = getDateFromTime(endTime)
              const meetingDuration = Math.abs(differenceInMinutes(dateRight, dateLeft))
              const addedTime = addMinutes(getDateFromTime(time.startTime), meetingDuration)
              time.endTime = format(addedTime, 'hh:mm')
            }
            handleFormInputChange(time)
          }}
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