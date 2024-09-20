import moment from 'moment'

export const formatedDateTimeIntoIst = (date: string) => {
    let formattedDate = date ? moment(date).format('DD-MM-YYYY') : '-'
    return formattedDate
}
