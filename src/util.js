import { format, add } from "date-fns";

export const getFormattedDate = (date = null, dateFormat = 'dd/MM/yyyy') => {
  return format(date ? new Date(date) : new Date(), dateFormat)
}

export const getCurrentTimeRange = () => {
  return format(new Date(), 'hh:mm')
}

export const getEndTime = () => {
  return format(add(new Date(), { minutes: 30 }), 'hh:mm')
}

export const getConflictingMeetings = (meetings, meetingTime) => {
  const { date, startTime, endTime } = meetingTime
  return meetings.filter(meeting => {
    if (meeting.date !== date) return false
    return (meeting.startTime < endTime) || (meeting.endTime < startTime)
  })
}