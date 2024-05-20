import moment from 'moment'

export const formatedDateTimeIntoIst = (date: string) => {
    let formattedDate = moment(date).format('DD-MM-YYYY, HH:mm A');
    return formattedDate;
}
