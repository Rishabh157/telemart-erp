export const orderStatusKey = {
    NOTASSIGNED: {
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-500',
        label: 'Not Assigned',
    },
    ASSIGNED: {
        bgColor: 'bg-green-100',
        textColor: 'text-green-500',
        label: 'Assigned',
    },
}

export const renderorderStatus = (status: number) => {
    const { bgColor, textColor, label } = status
        ? orderStatusKey['ASSIGNED']
        : orderStatusKey['NOTASSIGNED']

    return (
        <span
            className={`px-3 py-1 rounded-full text-[12px] inline-flex gap-2 items-center  ${bgColor} ${textColor}`}
        >
            {label}
        </span>
    )
}
