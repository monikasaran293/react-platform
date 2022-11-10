import { getFormattedDate, getCurrentTimeRange } from "../util";

export const DEFAULT_MEETING_DATA = {
  building: null,
  addMeeting: {
    id: Math.floor(10000000 + Math.random() * 90000000),
    title: '',
    date: getFormattedDate(),
    startTime: getCurrentTimeRange(),
    endTime: getCurrentTimeRange(),
    meetingRoomId: null
  }
}