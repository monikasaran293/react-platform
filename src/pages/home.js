import { useNavigate } from "react-router-dom";

import {
  Button,
  Card
} from '@mui/material';
import { Box } from "@mui/system";

import PageHeader from "../components/page.header";
import Loader from "../components/loader";
import { useOrganizerData } from "../client.api";

import { DEFAULT_MEETING_DATA } from "../constants/meeting.constants";
import { getConflictingMeetings } from "../util";
import { useEffect } from "react";


const Home = () => {
  const navigate = useNavigate();
  const { buildingsResponse, meetingRoomsResponse, meetingsResponse } = useOrganizerData()

  useEffect(() => {
    meetingsResponse.refetch()
  }, [])

  if (buildingsResponse?.isLoading || meetingRoomsResponse?.isLoading || meetingsResponse?.isLoading) return <Loader />

  const getTotalFreeRooms = () => {
    const { addMeeting } = DEFAULT_MEETING_DATA
    const conflictMeetings = getConflictingMeetings(meetingsResponse?.data, addMeeting)
    return meetingRoomsResponse?.data?.length - conflictMeetings.length
  }

  const renderBuildingsInfo = () => {
    if (buildingsResponse?.isError) return <div>{buildingsResponse?.error}</div>
    return (<Card variant="outlined" sx={{ paddingX: 2 }}>
      <h4>Buildings</h4>
      <Box sx={{ paddingBottom: 2 }}>
        Total Buildings: {buildingsResponse?.data?.length}
      </Box>
    </Card>)
  }

  const renderMeetingRoomsInfo = () => {
    if (meetingRoomsResponse?.isError) return <div>{meetingRoomsResponse?.error}</div>
    return <Card variant="outlined" sx={{ marginY: 2, paddingX: 2, paddingBottom: 2 }}>
      <h4>Meeting Rooms</h4>
      <Box>
        Total Meeting Rooms: {meetingRoomsResponse?.data?.length}
      </Box>
      <Box sx={{ paddingTop: 1 }}>
        Free Rooms Now: {getTotalFreeRooms()}
      </Box>
    </Card>
  }

  const renderMeetingsInfo = () => {
    if (meetingsResponse?.isError) return <div>{meetingsResponse?.error}</div>

    return <Card variant="outlined" sx={{ marginY: 2, paddingX: 2 }}>
      <h4>Meetings</h4>
      <Box sx={{ paddingBottom: 2 }}>
        Total Meetings: {meetingsResponse?.data?.length}
      </Box>
    </Card>
  }

  return <>
    <PageHeader text={'Smart Meeting Organizer'} />
    <Card sx={{ padding: 2, minHeight: 300 }}>
      {renderBuildingsInfo()}
      {renderMeetingRoomsInfo()}
      {renderMeetingsInfo()}
      <Button
        variant="contained"
        onClick={() => navigate('/new-meeting')}>
        Add a Meeting
      </Button>
    </Card>
  </>
}

export default Home