import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import {
  Button,
  Card
} from '@mui/material';
import { Box } from "@mui/system";

import { MeetingOrganizerContext } from "../App";

import PageHeader from "../components/page.header";
import Loader from "../components/loader";
import { DEFAULT_MEETING_DATA } from "../constants/meeting.constants";
import { fetchBuilding } from "../client.api";


const Home = () => {
  const navigate = useNavigate();
  const { state: { buildings, freeRooms }, dispatch } = useContext(MeetingOrganizerContext);

  const { isError, isSuccess, isLoading, data, error } = useQuery(
    ['buildings'],
    fetchBuilding,
    { staleTime: 60000 }
  )

  useEffect(() => {
    dispatch({ type: 'CLEAR_STATE', data: { addMeeting: DEFAULT_MEETING_DATA.addMeeting } })
    if (data) {
      dispatch({ type: 'GET_BUILDINGS', data })
      data?.length && dispatch({ type: 'SET_BUILDING', data: data[0] })
      dispatch({ type: 'GET_FREE_ROOMS' })
    }
  }, [data])

  if (isLoading) return <Loader />

  const renderBuildingsInfo = () => {
    return (<Card variant="outlined" sx={{ paddingX: 2 }}>
      <h4>Buildings</h4>
      <Box sx={{ paddingBottom: 2 }}>
        Total Buildings: {buildings?.length}
      </Box>
    </Card>)
  }

  const renderMeetingInfo = () => {
    const meetingRooms = buildings.reduce((a, b) => [...a, b.meetingRooms], [])
    const meetings = meetingRooms.reduce((a, b) => [...a, b.meetings], [])
    return <>
      <Card variant="outlined" sx={{ marginY: 2, paddingX: 2, paddingBottom: 2 }}>
        <h4>Meeting Rooms</h4>
        <Box>
          Total Meeting Rooms: {meetingRooms?.length}
        </Box>
        <Box sx={{ paddingTop: 1 }}>
          Free Rooms Now: {freeRooms?.length}
        </Box>
      </Card>
      <Card variant="outlined" sx={{ marginY: 2, paddingX: 2 }}>
        <h4>Meetings</h4>
        <Box sx={{ paddingBottom: 2 }}>
          Total Meetings: {meetings?.length}
        </Box>
      </Card>
    </>
  }
  return <>
    <PageHeader text={'Smart Meeting Organizer'} />
    <Card sx={{ padding: 2, minHeight: 300 }}>
      {renderBuildingsInfo()}
      {renderMeetingInfo()}
      <Button
        variant="contained"
        onClick={() => navigate('/new-meeting')}>
        Add a Meeting
      </Button>
    </Card>
  </>
}

export default Home