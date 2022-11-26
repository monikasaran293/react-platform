import { useContext } from "react"
import {
  Card,
  Divider,
  Grid,
} from '@mui/material';
import { MeetingOrganizerContext } from "../../App";
import { Box } from "@mui/system";


const Meetings = () => {
  const { state: { meetingRooms } } = useContext(MeetingOrganizerContext);

  if (!meetingRooms.length) {
    return (
      <Card raised={true} sx={{ padding: 2, marginBlock: 4 }}>
        No meeting rooms found on the building.
      </Card>
    )
  }

  return <Grid container spacing={2} marginBlock={2}>
    {
      meetingRooms.map((room, idx) => {
        return (
          <Grid item xs={4} key={idx}>
            <Card raised={true} sx={{ padding: 2 }}>
              <h4>Meeting Room: {room?.name}</h4>
              {
                room?.meetings.map((meeting, i) => {
                  const { title, date, startTime, endTime } = meeting
                  return <div key={i}>
                    <Divider />
                    <Box sx={{ marginY: 2, overflow: 'auto' }}>
                      <div>Meeting: {title}</div>
                      <div>Date: {date}</div>
                      <div>Time: {startTime} - {endTime}</div>
                    </Box>
                  </div>
                })
              }
            </Card>
          </Grid>
        )
      })
    }
  </Grid>

}

export default Meetings