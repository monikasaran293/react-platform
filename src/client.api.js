import { useQuery } from "react-query";
import graphQLClient, { addMeetingQueryDocument, buildingsQueryDocument, meetingRoomsByBuildingQueryDocument, meetingRoomsQueryDocument, meetingsQueryDocument } from "./graphql.config";

const fetchBuildings = async () => {
  const { Buildings } = await graphQLClient.request(buildingsQueryDocument)
  return Buildings
}

const fetchMeetingRooms = async () => {
  const { MeetingRooms } = await graphQLClient.request(meetingRoomsQueryDocument)
  return MeetingRooms
}

const fetchMeetings = async () => {
  const { Meetings } = await graphQLClient.request(meetingsQueryDocument)
  return Meetings
}

export const fetchMeetingRoomsByBuilding = async (variables) => {
  if (!variables?.id) return null
  const { Building } = await graphQLClient.request(meetingRoomsByBuildingQueryDocument, variables)
  return Building
}

export const addMeeting = async (variables) => {
  const { Meeting } = await graphQLClient.request(addMeetingQueryDocument, variables)
  return Meeting
}

export const useMeetingRoomsByBuilding = (id) => {
  return useQuery(
    ['meetingRoomsByBuilding', id],
    async () => await fetchMeetingRoomsByBuilding({ id }),
    { staleTime: 60000 }
  )
}

export const useAddMeeting = (variables) => {
  return useQuery(
    ['createMeeting', variables],
    async () => await addMeeting(variables),
    {
      staleTime: 60000,
      enabled: false
    }
  )
}

export const useOrganizerData = (id = null) => {
  const buildingsResponse = useQuery(
    ['buildings'],
    fetchBuildings,
    { staleTime: 60000 }
  )

  const meetingRoomsResponse = useQuery(
    ['meetingRooms'],
    fetchMeetingRooms,
    { staleTime: 60000 }
  )

  const meetingsResponse = useQuery(
    ['meetings'],
    fetchMeetings,
    { staleTime: 60000 }
  )

  return { buildingsResponse, meetingRoomsResponse, meetingsResponse }
}