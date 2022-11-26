import { GraphQLClient, gql } from 'graphql-request'

const endpoint = 'http://smart-meeting.herokuapp.com/'
const graphQLClient = new GraphQLClient(endpoint, {
  headers: { "token": "a123gjhgjsdf657" },
})

export const buildingsQueryDocument = gql`
{
  Buildings{
    id
    name
  }
}
`

export const meetingRoomsQueryDocument = gql`
  {
    MeetingRooms{
      id
      name
      floor
    }
  }
`

export const meetingsQueryDocument = gql`
  {
    Meetings{
      id
      title
      date
      startTime
      endTime
    }
  }
`

export const meetingRoomsByBuildingQueryDocument = gql`
query GetMeetingRooms($id: Int!) {
  Building(id: $id){
    id
    name
    meetingRooms{
      id
      name
      floor
      meetings {
        id
        title
        date
        startTime
        endTime
      }
    }
  }
}
`

export const addMeetingQueryDocument = gql`
mutation AddMeeting(
  $id: Int!
  $title: String!
  $date: String!
  $startTime: String!
  $endTime: String!
  $meetingRoomId: Int!
) {
  Meeting(
    id: $id
    title: $title
    date: $date
    startTime: $startTime
    endTime: $endTime
    meetingRoomId: $meetingRoomId
  ) {
    id
    title
  }
}
`

export default graphQLClient