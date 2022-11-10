function reducer(state, action) {
  switch (action.type) {
    case 'CLEAR_STATE':
      return { ...state, ...action.data }

    case 'GET_BUILDINGS':
      return { ...state, buildings: action.data };

    case 'GET_MEETINGS':
      return { ...state, meetings: action.data };

    case 'SET_BUILDING':
      const building = action.data
      const { id, name, meetingRooms } = building
      return { ...state, building: { id, name }, meetingRooms };

    case 'ADD_MEETING':
      return { ...state, addMeeting: { ...state.addMeeting, ...action.data } }

    case 'GET_FREE_ROOMS':
      const { addMeeting } = state
      const freeRooms = state.meetingRooms.filter(room => {
        if (!room.meetings?.length) return true
        const conflictMeetings = room.meetings.filter(meeting => {
          if (meeting.date !== addMeeting.date) return true
          return (meeting.startTime >= addMeeting.endTime) || (meeting.endTime < addMeeting.startTime)
        })
        return !!conflictMeetings.length
      })
      console.log(freeRooms)
      return { ...state, freeRooms }

    default:
      return state
  }
}

export default reducer