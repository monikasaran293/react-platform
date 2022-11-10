import { format } from "date-fns";

export const getFormattedDate = (date = null, dateFormat = 'dd/MM/yyyy') => {
  return format(date ? new Date(date) : new Date(), dateFormat)
}

export const getCurrentTimeRange = () => {
  return format(new Date(), 'hh:mm')
}