import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Grid,
  TextField
} from '@mui/material';
import { Box } from "@mui/system";

import { MeetingOrganizerContext } from "../App";
import { getFormattedDate } from "../util";
import { parse } from "date-fns";
import FreeRooms from "../components/free.rooms";
import graphQLClient, { addMeetingQueryDocument } from "../graphql.config";
import Buildings from "../components/buildings";
import PageHeader from "../components/page.header";
import Loader from "../components/loader";


const UserMeeting = () => {
  const navigate = useNavigate();

  const { state: { addMeeting }, dispatch } = useContext(MeetingOrganizerContext);
  const { title, date, startTime, endTime, meetingRoomId } = addMeeting

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch({ type: 'GET_FREE_ROOMS' })
  }, [date, startTime, endTime])

  const handleFormInputChange = (data) => {
    data.id = Date.now()
    dispatch({ type: 'ADD_MEETING', data })
  }

  const onCreateMeeting = async () => {
    const id = Math.floor(10000000 + Math.random() * 90000000)
    const variables = {
      id,
      title,
      date,
      startTime,
      endTime,
      meetingRoomId: 1
    }
    setLoading(true)
    try {
      await graphQLClient.request(addMeetingQueryDocument, variables)
      navigate('/')
    } catch (e) {
      console.log("Error while creating meeting");
    }
    setLoading(false)
  }

  if (loading) return <Loader />

  return <>
    <PageHeader text={'Add new Meeting'} onBackClick={() => navigate('/')} />
    <Card sx={{ padding: 2, minHeight: 300 }}>
      <Buildings />
      <Box sx={{ paddingBlock: 2, minHeight: 300 }}>
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

        <FreeRooms />

        <Button
          disabled={!(title && meetingRoomId)}
          onClick={onCreateMeeting}
          variant="contained">Create Meeting</Button>
      </Box>
    </Card>
  </>
}

export default UserMeeting