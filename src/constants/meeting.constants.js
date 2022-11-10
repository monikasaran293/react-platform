import { getFormattedDate, getCurrentTimeRange } from "../util";

export const DEFAULT_MEETING_DATA = {
  buildings: [],
  building: null,
  meetingRooms: [],
  freeRooms: [],
  addMeeting: {
    title: '',
    date: getFormattedDate(),
    startTime: getCurrentTimeRange(),
    endTime: getCurrentTimeRange(),
    meetingRoomId: null
  }
}