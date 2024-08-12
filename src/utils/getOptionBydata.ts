export const getOptions = ({
    data,
    keyName,
    value,
}: {
    data: any[]
    keyName: string | string[]
    value: string
}): { label: string; value: string }[] => {
    return data?.map((ele: any) => {
        if (Array.isArray(keyName)) {
            return {
                label: keyName.map((k) => ele[k]).join(' '), // Concatenating if keyName is an array
                value: ele[value],
            }
        }
        return {
            label: ele[keyName], // Directly using keyName
            value: ele[value],
            
        }
    })
}
