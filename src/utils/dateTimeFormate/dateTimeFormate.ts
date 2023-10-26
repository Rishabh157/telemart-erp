import { format } from 'date-fns'

export const formatedDateTimeIntoIst = (date: string) => {
    let dateNew = new Date(date)
    let formattedDate = format(dateNew, 'dd-MM-yyyy , HH : mm')
    return formattedDate
}

export const formatedDateTime = (date: string) => {
    let dateNew = new Date(date)
    let formattedDate = format(dateNew, 'dd-MM-yyyy')
    return formattedDate
}
