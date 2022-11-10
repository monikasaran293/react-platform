import { useContext } from "react"
import {
  Card,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { MeetingOrganizerContext } from "../App";


const FreeRooms = () => {
  const { state: { freeRooms, addMeeting }, dispatch } = useContext(MeetingOrganizerContext);

  const handleFreeRoomSelect = (meetingRoomId) => {
    dispatch({ type: 'ADD_MEETING', data: { meetingRoomId } })
  }

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