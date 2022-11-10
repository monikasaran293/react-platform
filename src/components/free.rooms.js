import { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query";
import {
  Card,
  CircularProgress,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { MeetingOrganizerContext } from "../App";
import { useMeetingRoomsByBuilding } from "../client.api";
import { getConflictingMeetings } from "../util";


const FreeRooms = () => {
  const { state: { addMeeting, building }, dispatch } = useContext(MeetingOrganizerContext);
  const [freeRooms, setFreeRooms] = useState([])

  const { data, isLoading, refetch } = useMeetingRoomsByBuilding(building?.id)

  useEffect(() => {
    refetch()
  }, [building])

  useEffect(() => {
    if (data) {
      const rooms = data.meetingRooms.filter(room => {
        if (!room.meetings?.length) return true
        const conflictMeetings = getConflictingMeetings(room.meetings, addMeeting)
        return !conflictMeetings.length
      })
      setFreeRooms(rooms)
    }
  }, [data, addMeeting])

  const handleFreeRoomSelect = (meetingRoomId) => {
    dispatch({ type: 'ADD_MEETING', data: { meetingRoomId } })
  }

  if (isLoading) return <Card sx={{ padding: 2, marginY: 2 }}><CircularProgress /></Card>

  if (!freeRooms.length) {
    return (
      <Card sx={{ padding: 2, marginY: 2 }}>
        No rooms available for meeting.
      </Card>
    )
  }

  return <Card sx={{ marginY: 2 }}>
    <List component="nav" aria-label="main mailbox folders">
      <ListSubheader>Please select one of the available rooms</ListSubheader>
      {
        freeRooms.map((room, idx) => (
          <ListItemButton
            key={idx}
            selected={addMeeting.meetingRoomId === room.id}
            onClick={(e) => handleFreeRoomSelect(room.id)}
          >
            <ListItemText primary={room?.name} />
          </ListItemButton>
        ))
      }
    </List>
  </Card>
}

export default FreeRooms