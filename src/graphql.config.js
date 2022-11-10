import { GraphQLClient, gql } from 'graphql-request'

const endpoint = 'http://smart-meeting.herokuapp.com/'
const graphQLClient = new GraphQLClient(endpoint, {
  headers: { "token": "a123gjhgjsdf657" },
})

export const buildingsQueryDocument = gql`
  {
    Buildings {
      id
      name
      meetingRooms{
        id
        name
        floor
        meetings{
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

export const meetingRoomsQueryDocument = gql`
  {
    MeetingRooms{
      name
      floor
      building{
        name
      }
      meetings{
        title
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