import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CircularProgress,
} from '@mui/material';
import { Box } from "@mui/system";

import { MeetingOrganizerContext } from "../App";
import { useAddMeeting, useOrganizerData } from "../client.api";

import FreeRooms from "../components/meeting-organiser/free.rooms";
import Buildings from "../components/meeting-organiser/select.buildings";
import PageHeader from "../components/page.header";
import AddMeeting from "../components/meeting-organiser/add.meeting";

import Loader from "../components/loader";


const UserMeeting = () => {
  const navigate = useNavigate();

  const { state: { addMeeting, building }, dispatch } = useContext(MeetingOrganizerContext);
  const { title, meetingRoomId } = addMeeting

  const { buildingsResponse } = useOrganizerData()
  const { refetch, isSuccess, isLoading } = useAddMeeting(addMeeting)

  useEffect(() => {
    if (buildingsResponse?.data) {
      dispatch({ type: 'SET_BUILDING', data: buildingsResponse?.data[0] })
    }
  }, [buildingsResponse?.data])

  useEffect(() => {
    isSuccess && navigate('/')
  }, [isSuccess])

  const onCreateMeeting = async () => {
    refetch()
  }

  // if (isSuccess) navigate('/')
  if (buildingsResponse?.isLoading) return <Loader />

  return <>
    <PageHeader text={'Add new Meeting'} onBackClick={() => navigate('/')} />
    <Card sx={{ padding: 2, minHeight: 300 }}>
      <Buildings />
      <Box sx={{ paddingBlock: 2, minHeight: 300 }}>
        <AddMeeting />
        {
          building && <FreeRooms />
        }
        {
          isLoading
            ? <CircularProgress />
            : <Button
              disabled={!(title && meetingRoomId)}
              onClick={onCreateMeeting}
              variant="contained">Create Meeting</Button>
        }

      </Box>
    </Card>
  </>
}

export default UserMeeting