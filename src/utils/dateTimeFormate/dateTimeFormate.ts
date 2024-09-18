import moment from 'moment'

export const formatedDateTimeIntoIst = (date: string) => {
    console.log('date: ***** ', date)
    let formattedDate = date ? moment(date).format('DD-MM-YYYY') : '-'
    return formattedDate
}
