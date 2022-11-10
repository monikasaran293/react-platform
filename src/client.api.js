import graphQLClient, { buildingsQueryDocument } from "./graphql.config";

export const fetchBuilding = async () => {
  const { Buildings } = await graphQLClient.request(buildingsQueryDocument)
  return Buildings
}

export const fetchMeetingRooms = async () => {
  const { Buildings } = await graphQLClient.request(buildingsQueryDocument)
  return Buildings
}

export const fetchMeetings = async () => {
  const { Buildings } = await graphQLClient.request(buildingsQueryDocument)
  return Buildings
}

export const fetchMeetingRoomsByBuilding = async () => {
  const { Buildings } = await graphQLClient.request(buildingsQueryDocument)
  return Buildings
}