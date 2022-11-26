import axios from 'axios'
import { useQuery } from "react-query";

const url = 'https://api.exchangerate.host'

export const useCountrySymbols = () => {
  return useQuery(
    ['symbols'],
    async () => await axios.get(`${url}/symbols`),
    { staleTime: 60000 }
  )
}

export const useRateConverter = (params) => {
  const { to, from } = params
  params.places = 2
  return useQuery(
    [`${from}-${to}`],
    async () => await axios.get(`${url}/convert`, { params }),
    {
      staleTime: 60000,
      enabled: false
    }
  )
}