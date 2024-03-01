import React from 'react'
import { useGetAllinitialCallerTwoByIdQuery } from 'src/services/configurations/InitialCallerTwoServices'

export const useGetAllInitialCallTwoByCallTypeAndOneId = (
    icOneId: string,
    callType: string
) => {
    const [
        initialCallTwoByCallTypeAndOneId,
        setInitialCallTwoByCallTypeAndOneId,
    ] = React.useState<any[]>([])

    // Get IC2 Option By Call Type And IC1 _id
    const { data, isFetching, isLoading } = useGetAllinitialCallerTwoByIdQuery(
        {
            id: icOneId,
            callType: callType,
        },
        {
            skip: !(icOneId && callType),
        }
    )

    React.useEffect(() => {
        if (!isLoading && !isFetching) {
            const filterOption = data?.data?.map((ele: any) => {
                return {
                    label: ele?.initialCallName,
                    value: ele?._id,
                }
            })
            setInitialCallTwoByCallTypeAndOneId(filterOption)
        }
    }, [data, isLoading, isFetching])

    return { initialCallTwoByCallTypeAndOneId, isDataLoading: isLoading }
}
