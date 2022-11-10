import { useContext, useEffect, useState } from "react"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { MeetingOrganizerContext } from "../App";
import { useOrganizerData } from "../client.api";


const Buildings = () => {
  const { state, dispatch } = useContext(MeetingOrganizerContext);
  const { buildingsResponse: { data } } = useOrganizerData()

  const handleBuildingChange = (event) => {
    const buildingId = event.target.value
    const building = data.find(b => b.id === buildingId)
    dispatch({ type: 'SET_BUILDING', data: building })
  }

  return data && state?.building
    ? <FormControl sx={{}} size="small">
      <InputLabel id="demo-select-small">Building</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={state?.building?.id}
        label="Building"
        onChange={handleBuildingChange}
      >
        {
          data.map((b, idx) => (
            <MenuItem key={idx} value={b.id}>{b.name}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
    : <div>No Buildings Found</div>
}

export default Buildings