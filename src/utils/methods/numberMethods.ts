export const handleValidNumber: (event: any) => boolean = (event) => {
    const numRegExp = /^[0-9]*$/ // Updated RegExp to allow numbers and %
    if (numRegExp.test(event?.target?.value)) {
        return true
    } else {
        return false
    }
}

export const handleValidNumberForSearch: (value: any) => boolean = (value) => {
    const numRegExp = /^[0-9]*$/ // Updated RegExp to allow numbers and %
    if (numRegExp.test(value)) {
        return true
    } else {
        return false
    }
}
