export const handleValidCharchater: (event: any) => boolean = (event) => {
    const regex = /^[a-zA-Z\s]+$/
    return regex.test(event?.target?.value)
}
