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


// var reAttemptDate = moment(values.reAttemptDate)
// var currentDate = moment()

// var diffInDays = reAttemptDate.diff(currentDate, 'days')

// if (diffInDays >= 0 && diffInDays < 15) {
//     alert(
//         'The provided reAttemptDate is within 15 days from the current date.'
//     )
// } else {
//     alert(
//         'Error: The provided reAttemptDate is not within 15 days from the current date.'
//     )
// }